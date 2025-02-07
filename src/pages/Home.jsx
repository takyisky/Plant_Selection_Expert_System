import React from "react";
import Chat from "../components/Chat";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-800 text-white p-6 text-center text-3xl font-bold">
        Plant Selection Expert System
      </header>

      {/* The Chat Bot System */}
      <main
        className="p-6 bg-cover bg-center"
        style={{ backgroundImage: `url('/nature-bg2.jpg')` }}
      >
        <Chat />
      </main>
      {/* <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Plant Selection Expert System. All rights
        reserved.
      </footer> */}
    </div>
  );
}

export default Home;
