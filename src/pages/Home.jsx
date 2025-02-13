import React from "react";
import Chat from "../components/Chat";

function Home() {
  return (
    <div className=" bg-gray-100 ">
      <div>
        {/* Sticky header */}
        <div
          className="sticky top-0 z-50 bg-cover bg-center h-24 flex justify-center items-center border-y-2"
          style={{ backgroundImage: `url('/plants-img1.jpg')` }}
        >
          <p className="bg-black bg-opacity-45 text-white text-lg font-bold p-5 rounded-xl border-2 border-white">
            Plant Recommendation Expert System
          </p>
        </div>
      </div>

      <div>
        {/* Chat container */}
        <main
          className="h-[calc(100vh-6rem)] p-2 md:p-6 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('/nature-bg2.jpg')` }}
        >
          <Chat />
        </main>
      </div>
    </div>
  );
}

export default Home;
