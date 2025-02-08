import React, { useState, useEffect, useRef } from "react";
// Import icons used for the buttons from react-icons.
import { FaPaperPlane, FaRedo, FaArrowDown } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";

// Defined an array of 21 question objects.
// Each object has a unique key (used to store the answer) and text (the question prompt).
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
  // State to hold the conversation messages.
  // Each message has a 'sender' ("bot" or "user") and the message text.
  const [chatLog, setChatLog] = useState([]);
  // State for the current value of the input field.
  const [input, setInput] = useState("");
  // State to track the current conversation phase:
  // "init" (waiting for the user to start), "inConversation" (questions are being asked),
  // "done" (conversation completed), or "stopped" (conversation ended).
  const [conversationState, setConversationState] = useState("init");
  // Object to store the answers provided by the user.
  // Keys correspond to question keys from the questions array.
  const [conditions, setConditions] = useState({});
  // Index of the current question being asked.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // A ref to ensure that the greeting message is sent only once on component mount.
  const didMount = useRef(false);
  // Ref for the chat log container element, used to scroll the conversation.
  const chatContainerRef = useRef(null);
  // Ref for the last bot message element.
  // This is used to scroll the last bot response into view.
  const lastBotMessageRef = useRef(null);

  // useEffect: Runs once on mount to send the initial greeting.
  useEffect(() => {
    if (!didMount.current) {
      addBotMessage(
        "Hi, I am the Plant Selection AI. I will ask you 21 questions to help determine the best plants for you. " +
          "Type 'yes' when you're ready to proceed, 'stop' to end, or 'restart' to start over."
      );
      didMount.current = true;
    }
  }, []);

  // useEffect: Whenever the chatLog updates and the last message is from the bot,
  // scroll that last bot message into view with a smooth behavior.
  useEffect(() => {
    if (chatLog.length > 0 && chatLog[chatLog.length - 1].sender === "bot") {
      if (lastBotMessageRef.current) {
        lastBotMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [chatLog]);

  // Helper function to add a message from the bot to the chat log.
  const addBotMessage = (msg) => {
    setChatLog((prev) => [...prev, { sender: "bot", message: msg }]);
  };

  // Helper function to add a message from the user to the chat log.
  const addUserMessage = (msg) => {
    setChatLog((prev) => [...prev, { sender: "user", message: msg }]);
  };

  // Reset the conversation by clearing all state and then sending the greeting.
  const resetConversation = () => {
    setConversationState("init");
    setConditions({});
    setCurrentQuestionIndex(0);
    setChatLog([]);
    addBotMessage(
      "Hi, I am the Plant Selection Expert System. I will ask you 21 questions to help determine the best plants for you. " +
        "Type 'yes' when you're ready to proceed, 'stop' to end, or 'restart' to start over."
    );
  };

  // Function to manually scroll to the last bot message.
  // Called when the user clicks the "scroll to last bot message" button.
  const scrollToLastBotMessage = () => {
    if (lastBotMessageRef.current) {
      lastBotMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to fetch plant recommendations from the backend.
  // It builds URL parameters from the conditions (answers), fetches the response,
  // and adds a bot message with the result.
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

  // Function to handle the user's input.
  // It processes commands ("stop", "restart"), updates conversation state,
  // saves answers, and triggers fetching recommendations when needed.
  const handleUserInput = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add the user message to the chat log.
    addUserMessage(trimmedInput);
    // Clear the input field.
    setInput("");

    const lowerInput = trimmedInput.toLowerCase();

    // Handle global commands:
    if (lowerInput === "stop") {
      addBotMessage("Bot stopped. Thank you for using Plant Selection AI.");
      setConversationState("stopped");
      return;
    }
    if (lowerInput === "restart") {
      resetConversation();
      return;
    }

    // If the conversation is in the initial state, start the conversation.
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

    // If the conversation is in progress:
    if (conversationState === "inConversation") {
      const currentQuestion = questions[currentQuestionIndex];
      // Save the answer for the current question.
      setConditions((prev) => ({
        ...prev,
        [currentQuestion.key]: trimmedInput,
      }));

      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        // If there are more questions, update the question index and prompt the next question.
        setCurrentQuestionIndex(nextIndex);
        addBotMessage(questions[nextIndex].text);
      } else {
        // If all questions have been answered, fetch recommendations.
        await fetchRecommendations({
          ...conditions,
          [currentQuestion.key]: trimmedInput,
        });
      }
      return;
    }

    // If the conversation is already completed, prompt the user for next actions.
    if (conversationState === "done") {
      addBotMessage(
        "If you'd like to start over, type 'restart'. To end, type 'stop'."
      );
      return;
    }

    // If the conversation is stopped, instruct the user how to restart.
    if (conversationState === "stopped") {
      addBotMessage("Bot is stopped. Type 'restart' to start again.");
      return;
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col min-h-screen">
      {/* Chat log container: displays the conversation messages. */}
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
              // If the message is from the bot, assign the ref so that it tracks the last bot message.
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

      {/* Sticky input area fixed at the bottom of the screen. */}
      <div className="sticky bottom-2 shadow-lg bg-gray-800 bg-opacity-90 p-2 rounded-3xl">
        <div className="relative">
          {/* Input field for typing messages. */}
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
          {/* Buttons container, positioned absolutely inside the input area */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-5 space-x-3">
            {/* Send button */}
            <button
              className="text-green-600 hover:text-green-800"
              onClick={handleUserInput}
            >
              <FaPaperPlane size={20} />
            </button>
            {/* Recommend button, conditionally shown after question 5 */}
            {conversationState === "inConversation" &&
              currentQuestionIndex >= 5 && (
                <button
                  className="text-blue-400 hover:text-blue-800"
                  onClick={() => fetchRecommendations(conditions)}
                >
                  <GrStatusGood size={22} />
                </button>
              )}
            {/* Restart button */}
            <button
              className="text-red-600 hover:text-red-800"
              onClick={resetConversation}
            >
              <FaRedo size={20} />
            </button>
            {/* Scroll to last bot message button */}
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
