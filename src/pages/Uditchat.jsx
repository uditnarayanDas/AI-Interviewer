import React, { useState } from "react";

const personalReplies = {
  "what is your name": {
    text: "Hi! My name is Udit Narayan Das. I'm a passionate developer and tech enthusiast from India 🇮🇳.",
    image: "/images/udit-profile.jpg"
  },
  "tell me about your project": {
    text: "I'm currently working on an AI chatbot, a chat app like WhatsApp, and a college collaboration platform called CampConnect.",
    image: "/images/project-demo.jpg"
  },
  "what are your strengths": {
    text: "My strengths include quick learning, consistency, and problem-solving using Python and JavaScript.",
    image: "/images/strengths.jpg"
  },
  "what are your weaknesses": {
    text: "I used to overthink a lot, but now I try to stay focused on action. I’m working to improve it every day.",
    image: "/images/weakness.jpg"
  },
  "what are your achievements": {
    text: "I completed 3 internships, built multiple full-stack projects, and got shortlisted for top product-based companies' interviews.",
    image: "/images/achievement.jpg"
  }
};

const funFacts = [
  "Did you know the Moon is 384,400 km away from Earth? 🌕🚀",
  "Bananas are berries, strawberries aren’t. 🍌🍓",
  "Octopuses have three hearts. 🐙",
  "The Eiffel Tower can grow 6 inches in summer. 🗼",
  "A day on Venus is longer than its year. 🪐"
];

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const cleanedInput = input.toLowerCase().replace(/[^\w\s]/gi, "").trim();
    let botReply;

    // keyword-based matching
    if (cleanedInput.includes("name") || cleanedInput.includes("udit")) {
      botReply = personalReplies["what is your name"];
    } else if (cleanedInput.includes("project")) {
      botReply = personalReplies["tell me about your project"];
    } else if (
      cleanedInput.includes("strength") ||
      cleanedInput.includes("skill")
    ) {
      botReply = personalReplies["what are your strengths"];
    } else if (cleanedInput.includes("weakness")) {
      botReply = personalReplies["what are your weaknesses"];
    } else if (cleanedInput.includes("achievement")) {
      botReply = personalReplies["what are your achievements"];
    } else {
      const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
      botReply = {
        text: `Sorry Bro, I'm not ChatGPT. But hey, ${randomFact}`,
        image: null
      };
    }

    const newMessages = [
      ...messages,
      { sender: "user", text: input },
      { sender: "bot", text: botReply.text, image: botReply.image }
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-balck rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">👋 Ask Udit Anything!</h2>
      <div className="h-96 overflow-y-auto space-y-4 mb-4 bg-black p-4 rounded-md">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-sm text-black ${
                msg.sender === "user"
                  ? "bg-blue-200 text-right"
                  : "bg-green-100 text-left"
              }`}
            >
              <p>{msg.text}</p>
              {msg.image && (
                <img
                  src={msg.image}
                  alt="response visual"
                  className="mt-2 rounded"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-l"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-black px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
