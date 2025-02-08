import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaRedo, FaArrowDown } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";

// Define 21 questions with their corresponding parameter keys
const questions = [
  {
    key: "sunlight",
    text: "What is your sunlight level? (e.g., full, partial, shade)",
  },
  { key: "soil", text: "What is your soil type? (e.g., sandy, clay, loamy)" },
  {
    key: "maintenance",
    text: "What is your maintenance requirement? (e.g., low, medium, high)",
  },
  {
    key: "hardiness_zone",
    text: "What is your hardiness zone? (e.g., zone5, zone7)",
  },
  {
    key: "soil_ph",
    text: "What is your soil pH? (e.g., neutral, acidic, alkaline)",
  },
  {
    key: "drainage",
    text: "How is your soil drainage? (e.g., good, moderate, poor)",
  },
  {
    key: "irrigation_needs",
    text: "What are your irrigation needs? (e.g., low, moderate, high)",
  },
  {
    key: "drought_tolerance",
    text: "What is your drought tolerance? (e.g., low, moderate, high)",
  },
  {
    key: "light_availability",
    text: "What is your light availability? (e.g., full, partial, shade)",
  },
  {
    key: "plant_light_needs",
    text: "What are your plant light needs? (e.g., full, partial, shade)",
  },
  {
    key: "size_at_maturity",
    text: "What is the size at maturity? (e.g., small, medium, large)",
  },
  {
    key: "growth_rate",
    text: "What is the growth rate? (e.g., slow, moderate, fast)",
  },
  {
    key: "pruning",
    text: "How much pruning is required? (e.g., low, medium, high)",
  },
  {
    key: "pest_resistance",
    text: "How pest resistant are the plants? (e.g., low, moderate, high)",
  },
  {
    key: "bloom_time",
    text: "What is the bloom time? (e.g., spring, summer, fall)",
  },
  { key: "native", text: "Are the plants native? (yes or no)" },
  {
    key: "biodiversity",
    text: "What level of biodiversity? (e.g., low, moderate, high)",
  },
  {
    key: "wind_exposure",
    text: "What is the wind exposure? (e.g., low, moderate, high)",
  },
  {
    key: "slope_elevation",
    text: "What is the slope/elevation? (e.g., low, moderate, high)",
  },
  {
    key: "purpose",
    text: "What is the purpose? (e.g., edible, ornamental, screening, culinary)",
  },
  {
    key: "wildlife_habitat",
    text: "Do you require wildlife habitat support? (yes or no)",
  },
];

function Chat() {
  // Conversation log holds messages (bot/user)
  const [chatLog, setChatLog] = useState([]);
  // Input field value
  const [input, setInput] = useState("");
  // Conversation state: "init", "inConversation", "done", "stopped"
  const [conversationState, setConversationState] = useState("init");
  // Collected conditions from answers
  const [conditions, setConditions] = useState({});
  // Track the index of the current question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Ref to ensure the greeting is only sent once
  const didMount = useRef(false);
  // Ref for the chat container (used for manual scroll, if needed)
  const chatContainerRef = useRef(null);
  // Ref for the last bot message
  const lastBotMessageRef = useRef(null);

  // On mount, show the greeting only once
  useEffect(() => {
    if (!didMount.current) {
      addBotMessage(
        "Hi, I am the Plant Selection AI. I will ask you 21 questions to help determine the best plants for you. " +
          "Type 'yes' when you're ready to proceed, 'stop' to end, or 'restart' to start over."
      );
      didMount.current = true;
    }
  }, []);

  // Automatically scroll to the last bot message when a new bot response is added
  useEffect(() => {
    if (chatLog.length > 0 && chatLog[chatLog.length - 1].sender === "bot") {
      if (lastBotMessageRef.current) {
        lastBotMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [chatLog]);

  const addBotMessage = (msg) => {
    setChatLog((prev) => [...prev, { sender: "bot", message: msg }]);
  };

  const addUserMessage = (msg) => {
    setChatLog((prev) => [...prev, { sender: "user", message: msg }]);
  };

  const resetConversation = () => {
    setConversationState("init");
    setConditions({});
    setCurrentQuestionIndex(0);
    setChatLog([]);
    addBotMessage(
      "Hi, I am the Plant Selection AI. I will ask you 21 questions to help determine the best plants for you. " +
        "Type 'yes' when you're ready to proceed, 'stop' to end, or 'restart' to start over."
    );
  };

  // Manual scroll to last bot message
  const scrollToLastBotMessage = () => {
    if (lastBotMessageRef.current) {
      lastBotMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchRecommendations = async (conds) => {
    const params = new URLSearchParams();
    Object.entries(conds).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        params.append(key, value.trim());
      }
    });

    try {
      const response = await fetch(
        `http://localhost:5000/chat?${params.toString()}`
      );
      const data = await response.json();
      if (
        data.answer.length === 1 &&
        data.answer[0] === "No suitable plants found"
      ) {
        addBotMessage(
          "According to our current knowledge base, we couldn't find any suitable plants. " +
            "You can type 'restart' or use 'red' button to provide different parameters."
        );
      } else {
        addBotMessage(
          "Here are your plant recommendations: " + data.answer.join(", ")
        );
      }
      setConversationState("done");
    } catch (err) {
      console.error(err);
      addBotMessage("There was an error fetching recommendations.");
    }
  };

  const handleUserInput = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    addUserMessage(trimmedInput);
    setInput("");

    const lowerInput = trimmedInput.toLowerCase();

    if (lowerInput === "stop") {
      addBotMessage("Bot stopped. Thank you for using Plant Selection AI.");
      setConversationState("stopped");
      return;
    }
    if (lowerInput === "restart") {
      resetConversation();
      return;
    }
    if (conversationState === "init") {
      if (lowerInput === "yes") {
        setConversationState("inConversation");
        setCurrentQuestionIndex(0);
        addBotMessage(questions[0].text);
      } else {
        addBotMessage(
          "Please type 'yes' to begin, 'stop' to end, or 'restart' to start over."
        );
      }
      return;
    }
    if (conversationState === "inConversation") {
      const currentQuestion = questions[currentQuestionIndex];
      setConditions((prev) => ({
        ...prev,
        [currentQuestion.key]: trimmedInput,
      }));

      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
        addBotMessage(questions[nextIndex].text);
      } else {
        await fetchRecommendations({
          ...conditions,
          [currentQuestion.key]: trimmedInput,
        });
      }
      return;
    }
    if (conversationState === "done") {
      addBotMessage(
        "If you'd like to start over, type 'restart'. To end, type 'stop'."
      );
      return;
    }
    if (conversationState === "stopped") {
      addBotMessage("Bot is stopped. Type 'restart' to start again.");
      return;
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col min-h-screen">
      <div
        ref={chatContainerRef}
        className="flex-grow mb-6 p-6 bg-gray-800 bg-opacity-90 rounded-2xl shadow overflow-y-auto space-y-5"
      >
        {chatLog.map((entry, index) => (
          <div
            key={index}
            className={`flex ${
              entry.sender === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              ref={entry.sender === "bot" ? lastBotMessageRef : null}
              className={`p-4 rounded-xl max-w-2/3 ${
                entry.sender === "bot"
                  ? "bg-green-400 bg-opacity-55 text-white"
                  : "bg-blue-400 bg-opacity-55 text-white"
              }`}
            >
              {entry.message}
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-2 shadow-lg bg-gray-800 bg-opacity-90 p-2 rounded-3xl">
        <div className="relative">
          <input
            className="bg-gray-900 text-white rounded-2xl p-4 pr-20 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUserInput();
              }
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-5 space-x-3">
            <button
              className="text-green-600 hover:text-green-800"
              onClick={handleUserInput}
            >
              <FaPaperPlane size={20} />
            </button>
            {conversationState === "inConversation" &&
              currentQuestionIndex >= 5 && (
                <button
                  className="text-blue-400 hover:text-blue-800"
                  onClick={() => fetchRecommendations(conditions)}
                >
                  <GrStatusGood size={22} />
                </button>
              )}
            <button
              className="text-red-600 hover:text-red-800"
              onClick={resetConversation}
            >
              <FaRedo size={20} />
            </button>
            <button
              className="text-yellow-600 hover:text-yellow-800"
              onClick={scrollToLastBotMessage}
            >
              <FaArrowDown size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
