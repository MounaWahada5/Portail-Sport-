import { useEffect, useRef, useState } from "react";

export default function AIcoach() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Salut ! Je suis AIcoach, ton assistant sportif intelligent. Pose-moi toutes tes questions sur le sport ! 🏋️‍♂️",
      detected_domain: "sports",
      sources: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const allowedDomains = ["sports", "fitness", "nutrition", "health", "exercise"];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchBotReply = async (msg) => {
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: msg }),
      });

      if (!response.ok) throw new Error("Erreur réseau");

      const data = await response.json();

      return {
        answer: data.answer || "🤖 Pas de réponse du serveur.",
        sources: data.sources || [],
        detected_domain: data.detected_domain || "",
      };
    } catch {
      return {
        answer: "⚠️ Erreur serveur, réessaie plus tard.",
        sources: [],
        detected_domain: "",
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const botReply = await fetchBotReply(input);
    const domainAllowed = allowedDomains.includes(botReply.detected_domain.toLowerCase());

    const displayText = domainAllowed
      ? botReply.answer
      : "⚠️ Je suis un assistant **sportif**. Pose-moi des questions sur l'entraînement, la nutrition sportive, les exercices, les athlètes, etc. 🏋️‍♀️";

    const sources = domainAllowed ? botReply.sources : [];

    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text: displayText,
        detected_domain: botReply.detected_domain,
        sources,
      },
    ]);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white shadow-xl border border-blue-300 rounded-xl overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center space-x-3 p-4 border-b">
        <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">
          🏅
        </div>
        <h1 className="text-2xl font-extrabold text-blue-700">AIcoach</h1>
      </div>

      {/* MESSAGES AVEC SCROLL */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.from === "bot" && (
              <div className="mr-2 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center text-white text-xl select-none">
                  🤖
                </div>
              </div>
            )}

            <div
              className={`p-4 rounded-2xl max-w-xs text-sm whitespace-pre-wrap shadow-md ${
                msg.from === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white border border-blue-200 rounded-bl-none"
              }`}
            >
              {msg.text}
              {msg.from === "bot" && msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  <strong>Sources :</strong>
                  <ul>
                    {msg.sources.map((src, i) => (
                      <li key={i}>
                        <a href={src} target="_blank" rel="noopener noreferrer">
                          {src}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {msg.from === "user" && (
              <div className="ml-2 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl select-none">
                  🙋‍♂️
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-gray-500 italic px-4">
            <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center text-white text-xl select-none">
              🤖
            </div>
            <div>AIcoach écrit...</div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* FOOTER FIXE (sticky bottom-0) */}
      <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t flex">
        <input
          type="text"
          className="flex-1 p-3 border border-blue-300 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          placeholder="Pose ta question sportive..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
          autoFocus
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 disabled:bg-blue-400 text-white px-6 rounded-r-2xl hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
