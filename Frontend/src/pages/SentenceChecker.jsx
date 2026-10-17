import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const MAX_LENGTH = 300;

const examples = [
  "He go to school yesterday.",
  "She don't like coffee.",
  "I am agree with you.",
  "Me and my friend is going to the market.",
];

function SentenceChecker() {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/api/ai/correct`,
        { sentence },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data.result);
      setRemaining(res.data.remaining);
    } catch (err) {
      setError(err.response?.data?.message || "Could not check the sentence");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
            <h2 className="section-title">Grammar Assistant</h2>
      <p className="learning-meta">
        Check a sentence and get a correction with a clear explanation.
      </p>

      <div className="panel">
        <textarea
          className="checker-input"
          rows={4}
          maxLength={MAX_LENGTH}
          placeholder="Type your sentence here..."
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
        />

        <div className="checker-row">
          <span className="learning-meta">
            {sentence.length} / {MAX_LENGTH}
          </span>
          <button
            className="feature-btn"
            onClick={handleCheck}
            disabled={loading || sentence.trim().length < 3}
          >
            {loading ? "Checking..." : "Check sentence"}
          </button>
        </div>

        <p className="learning-meta">Try an example:</p>
        <div className="topic-chips">
          {examples.map((text) => (
            <button className="topic-chip" key={text} onClick={() => setSentence(text)}>
              {text}
            </button>
          ))}
        </div>

        {error && <p className="auth-error">{error}</p>}

        {result && (
          <div className={result.isCorrect ? "checker-result good" : "checker-result"}>
            {result.isCorrect ? (
              <p>
                <strong>✓ Your sentence is correct.</strong>
              </p>
            ) : (
              <>
                <p className="checker-label">Corrected sentence</p>
                <p className="checker-corrected">{result.corrected}</p>
              </>
            )}
            {result.explanation && <p className="checker-explain">{result.explanation}</p>}
          </div>
        )}

        {remaining !== null && (
          <p className="learning-meta">Checks left today: {remaining}</p>
        )}

        <p className="learning-meta">
          AI can make mistakes, so double-check important sentences. Please don't type personal
          information.
        </p>
      </div>
    </div>
  );
}

export default SentenceChecker;