import { useEffect, useRef, useState } from "react";
import { askMeCategories } from "../../data/askMeData";

const greeting = {
  from: "bot",
  text: "Hi! I'm Ask Me. Pick a question below and I'll answer it.",
};

function AskMe() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [category, setCategory] = useState(askMeCategories[0].name);
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef(null);
  const timerRef = useRef(null);

  // Keep the newest message in view
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing, open]);

  // Close with the Escape key
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Stop the pending reply if the widget is removed
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleAsk = (item) => {
    if (typing) return;

    setMessages((prev) => [...prev, { from: "user", text: item.question }]);
    setTyping(true);

    timerRef.current = setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: item.answer }]);
      setTyping(false);
    }, 600);
  };

  const handleClear = () => {
    clearTimeout(timerRef.current);
    setTyping(false);
    setMessages([greeting]);
  };

  const activeCategory = askMeCategories.find((item) => item.name === category);

  return (
    <div className="askme">
      {open && (
        <div className="askme-panel" role="dialog" aria-label="Ask Me">
          <div className="askme-header">
            <div>
              <h3>Ask Me</h3>
              <p>Quick answers to common questions</p>
            </div>
            <div className="askme-header-actions">
              <button className="askme-icon-btn" onClick={handleClear}>
                Clear
              </button>
              <button
                className="askme-icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="askme-messages" aria-live="polite">
            {messages.map((msg, index) => (
              <div key={index} className={`askme-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}

            {typing && <div className="askme-msg bot askme-typing">Typing...</div>}

            <div ref={bottomRef}></div>
          </div>

          <div className="askme-picker">
            <div className="askme-cats">
              {askMeCategories.map((item) => (
                <button
                  key={item.name}
                  className={item.name === category ? "askme-cat active" : "askme-cat"}
                  onClick={() => setCategory(item.name)}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="askme-questions">
              {activeCategory.questions.map((item) => (
                <button
                  key={item.id}
                  className="askme-q"
                  onClick={() => handleAsk(item)}
                  disabled={typing}
                >
                  {item.question}
                </button>
              ))}
            </div>

            <p className="askme-note">Prewritten answers to common questions.</p>
          </div>
        </div>
      )}

      <button
        className="askme-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>💬</span>
        {open ? "Close" : "Ask Me"}
      </button>
    </div>
  );
}

export default AskMe;