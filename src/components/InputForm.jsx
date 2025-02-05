import { useState } from 'react';

function InputForm({ onSubmit }) {
  const [sunlight, setSunlight] = useState('full');
  const [soil, setSoil] = useState('sandy');
  const [maintenance, setMaintenance] = useState('low');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(sunlight, soil, maintenance);
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white shadow-xl rounded-xl p-6 max-w-md mx-auto space-y-6"
    >
      {/* Form Header */}
      <h2 className="text-2xl font-bold text-center text-green-700">
        Plant Selection
      </h2>

      {/* Sunlight Level Selection */}
      <div className="flex flex-col">
        <label 
          htmlFor="sunlight" 
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Sunlight Level
        </label>
        <select
          id="sunlight"
          value={sunlight}
          onChange={(e) => setSunlight(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition"
        >
          <option value="full">Full Sun</option>
          <option value="partial">Partial Sun</option>
          <option value="shade">Shade</option>
        </select>
      </div>

      {/* Soil Type Selection */}
      <div className="flex flex-col">
        <label 
          htmlFor="soil" 
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Soil Type
        </label>
        <select
          id="soil"
          value={soil}
          onChange={(e) => setSoil(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition"
        >
          <option value="sandy">Sandy</option>
          <option value="loamy">Loamy</option>
          <option value="clay">Clay</option>
          <option value="rocky">Rocky</option>
          <option value="peaty">Peaty</option>
          <option value="silty">Silty</option>
          <option value="chalky">Chalky</option>
        </select>
      </div>

      {/* Maintenance Level Selection */}
      <div className="flex flex-col">
        <label 
          htmlFor="maintenance" 
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Maintenance Level
        </label>
        <select
          id="maintenance"
          value={maintenance}
          onChange={(e) => setMaintenance(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition duration-200"
      >
        Get Recommendations
      </button>
    </form>
  );
}

export default InputForm;
