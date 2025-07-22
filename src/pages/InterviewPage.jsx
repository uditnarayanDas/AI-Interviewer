import React, { useState } from "react";

export default function InterviewPage() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Welcome to your mock interview. Let's begin!" },
    { from: "ai", text: "Can you introduce yourself?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "What are your strengths?" },
      ]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">🎙️ Mock Interview</h1>

      <div className="space-y-4 max-w-2xl mx-auto mb-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl w-fit max-w-[80%] ${
              msg.from === "ai"
                ? "bg-zinc-800 text-left"
                : "bg-violet-600 ml-auto text-right"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 max-w-2xl mx-auto">
        <input
          className="flex-1 p-3 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none"
          placeholder="Type your answer..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-violet-600 px-4 rounded-md text-white font-medium"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
