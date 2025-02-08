import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaRedo, FaArrowDown, FaPlus } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";

// Array of question objects.
const questions = [
  {
    key: "sunlight",
    text: "What is your sunlight level? (e.g., full, partial, shade).",
  },
  {
    key: "soil",
    text: "What is your soil type? (e.g., sandy, clay, loamy). Type 'avaliable' to see all options.",
  },
  {
    key: "maintenance",
    text: "What is your maintenance requirement? (e.g., low, medium, high).",
  },
  {
    key: "hardiness_zone",
    text: "What is your hardiness zone? (e.g., zone5, zone7). Type 'avaliable' to see all options.",
  },
  {
    key: "soil_ph",
    text: "What is your soil pH? (e.g., neutral, acidic, alkaline). Type 'avaliable' to see all options.",
  },
  {
    key: "drainage",
    text: "How is your soil drainage? (e.g., good, moderate, poor).",
  },
  {
    key: "irrigation_needs",
    text: "What are your irrigation needs? (e.g., low, moderate, high).",
  },
  {
    key: "drought_tolerance",
    text: "What is your drought tolerance? (e.g., low, moderate, high).",
  },
  {
    key: "light_availability",
    text: "What is your light availability? (e.g., full, partial, shade).",
  },
  {
    key: "plant_light_needs",
    text: "What are your plant light needs? (e.g., full, partial, shade).",
  },
  {
    key: "size_at_maturity",
    text: "What is the size at maturity? (e.g., small, medium, large).",
  },
  {
    key: "growth_rate",
    text: "What is the growth rate? (e.g., slow, moderate, fast).",
  },
  {
    key: "pruning",
    text: "How much pruning is required? (e.g., low, medium, high).",
  },
  {
    key: "pest_resistance",
    text: "How pest resistant are the plants? (e.g., low, moderate, high).",
  },
  {
    key: "bloom_time",
    text: "What is the bloom time? (e.g., spring, summer, fall).",
  },
  {
    key: "native",
    text: "Are the plants native? (yes or no).",
  },
  {
    key: "biodiversity",
    text: "What level of biodiversity? (e.g., low, moderate, high).",
  },
  {
    key: "wind_exposure",
    text: "What is the wind exposure? (e.g., low, moderate, high).",
  },
  {
    key: "slope_elevation",
    text: "What is the slope/elevation? (e.g., low, moderate, high).",
  },
  {
    key: "purpose",
    text: "What is the purpose? (e.g., edible, ornamental, screening, culinary). Type 'avaliable' to see all options.",
  },
  {
    key: "wildlife_habitat",
    text: "Do you require wildlife habitat support? (yes or no).",
  },
];

function Chat() {
  // State variables
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");
  const [conversationState, setConversationState] = useState("init");
  const [conditions, setConditions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Refs for tracking mount, scrolling, and the top element.
  const didMount = useRef(false);
  const chatContainerRef = useRef(null);
  const lastBotMessageRef = useRef(null);
  const topRef = useRef(null);

  // On component mount, send the initial greeting.
  useEffect(() => {
    if (!didMount.current) {
      addBotMessage(
        "Hi, I am the Plant Recommendation Expert System. I will ask you 21 questions to help determine the best plants for you. " +
          "Type 'yes' when you're ready to proceed or 'help' for help on how to use the system."
      );
      didMount.current = true;
    }
  }, []);

  // Scroll to the top (with your specific margin top) on page refresh/mount.
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Scroll to the last bot message after each chat log update.
  useEffect(() => {
    if (
      chatLog.length > 0 &&
      chatLog[chatLog.length - 1].sender === "bot" &&
      lastBotMessageRef.current
    ) {
      lastBotMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatLog]);

  // Helper functions.
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
    addBotMessage(
      "Hi, I am the Plant Recommendation Expert System. I will ask you 21 questions to help determine the best plants for you. " +
        "Type 'yes' when you're ready to proceed or 'help' for help on how to use the system."
    );
  };

  const clearChat = () => {
    setChatLog([]);
    setConversationState("init");
    setConditions({});
    setCurrentQuestionIndex(0);
    addBotMessage(
      "Hi, I am the Plant Recommendation Expert System. I will ask you 21 questions to help determine the best plants for you. " +
        "Type 'yes' when you're ready to proceed or 'help' for help on how to use the system."
    );
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
            "You can type 'restart' or use the red button to provide different parameters."
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

  const fetchAvailableParameters = async (paramKey) => {
    try {
      const response = await fetch(
        `http://localhost:5000/parameters?key=${paramKey}`
      );
      const data = await response.json();
      if (data.parameters && data.parameters.length > 0) {
        addBotMessage(
          `Available options for ${paramKey}: ${data.parameters.join(", ")}`
        );
      } else {
        addBotMessage(`No available options found for ${paramKey}.`);
      }
    } catch (err) {
      console.error(err);
      addBotMessage("There was an error fetching available parameters.");
    }
  };

  const handleUserInput = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    addUserMessage(trimmedInput);
    setInput("");

    const lowerInput = trimmedInput.toLowerCase();

    // Global commands.
    if (lowerInput === "stop") {
      addBotMessage(
        "Bot stopped. Thank you for using the Plant Selection Expert System."
      );
      setConversationState("stopped");
      return;
    }
    if (lowerInput === "restart") {
      resetConversation();
      return;
    }
    if (lowerInput === "help") {
      addBotMessage(
        "Welcome to the Plant Selection Expert System! I will ask you 21 questions about your garden conditions and preferences. " +
          "Answer each question with the appropriate value. For any question, if you're unsure about the available options, " +
          "type 'avaliable' to see them. At any time, type 'restart' to start over or 'stop' to end the session. " +
          "When you're ready to begin, type 'yes'."
      );
      return;
    }
    if (lowerInput === "avaliable" && conversationState === "inConversation") {
      const currentQuestion = questions[currentQuestionIndex];
      await fetchAvailableParameters(currentQuestion.key);
      return;
    }
    if (conversationState === "init") {
      if (lowerInput === "yes") {
        setConversationState("inConversation");
        setCurrentQuestionIndex(0);
        addBotMessage(questions[0].text);
      } else {
        addBotMessage(
          "Please type 'yes' to begin or 'help' for guidance on how to use the system."
        );
      }
      return;
    }
    if (conversationState === "inConversation") {
      const currentQuestion = questions[currentQuestionIndex];
      const sanitizedInput = lowerInput.replace(/\s+/g, "");

      setConditions((prev) => ({
        ...prev,
        [currentQuestion.key]: sanitizedInput,
      }));

      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
        addBotMessage(questions[nextIndex].text);
      } else {
        await fetchRecommendations({
          ...conditions,
          [currentQuestion.key]: sanitizedInput,
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
    // Use h-full so that Chat fills the height provided by its parent.
    <div
      ref={topRef}
      className="max-w-4xl mx-auto flex flex-col h-5/6 md:h-[calc(100vh-9rem)] scroll-mt-36"
    >
      {/* Chat log container */}
      <div
        ref={chatContainerRef}
        className="flex-grow mb-6 p-4 md:p-6 bg-gray-800 bg-opacity-90 rounded-2xl shadow overflow-y-auto space-y-8 scrollbar-hide"
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
              className={`p-4 rounded-xl ${
                entry.sender === "bot"
                  ? "bg-green-400 bg-opacity-55 text-white"
                  : "bg-blue-400 bg-opacity-55 text-white max-w-80"
              }`}
            >
              {entry.message}
            </div>
          </div>
        ))}
      </div>
      {/* Input area */}
      <div className="sticky shadow-lg bg-gray-800 bg-opacity-90 p-2 rounded-3xl">
        <div className="relative">
          <input
            className="bg-gray-900 text-white rounded-2xl p-4 pr-36 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUserInput();
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
              className="text-purple-400 hover:text-purple-800"
              onClick={clearChat}
            >
              <FaPlus size={22} />
            </button>
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
