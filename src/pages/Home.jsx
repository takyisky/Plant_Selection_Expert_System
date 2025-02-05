import React, { useState } from "react";
import { usePlantRecommendations } from "../hooks/usePlantRecommendations";
import InputForm from "../components/InputForm";
import ResultList from "../components/ResultList";

function Home() {
  const { recommendations, getRecommendations } = usePlantRecommendations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleFormSubmit(sunlight, soil, maintenance) {
    getRecommendations({ sunlight, soil, maintenance });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 text-center text-3xl font-bold shadow-md">
        Plant Selection Expert System
      </header>

      <main className="flex-grow">
        {/* Background image container behind the form */}
        <div className="relative mx-auto">
          {/* Background Image */}
          <img
            src="/nature-bg2.jpg" // Replace with your image URL
            alt="Nature background"
            className="absolute inset-0 w-full h-full object-cover "
          />
          {/* Form Container */}
          <div className="relative p-8">
            <InputForm onSubmit={handleFormSubmit} />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={closeModal}
          >
            <div
              className="bg-gray-200 rounded-xl shadow-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()} // Prevent modal close on inner clicks
            >
              <button
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-2xl font-bold"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  stroke="currentColor"
                >
                  <g>
                    <path
                      d="M14.5 9.5L9.5 14.5M9.5 9.5L14.5 14.5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </button>
              <ResultList plants={recommendations} />
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600 shadow-inner">
        © {new Date().getFullYear()} Plant Selection Expert System. All rights
        reserved.
      </footer>
    </div>
  );
}

export default Home;
