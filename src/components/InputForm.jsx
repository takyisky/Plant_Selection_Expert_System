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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <div>
        <label className="block mb-2">Sunlight Level:</label>
        <select
          value={sunlight}
          onChange={(e) => setSunlight(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="full">Full Sun</option>
          <option value="partial">Partial Sun</option>
          <option value="shade">Shade</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">Soil Type:</label>
        <select
          value={soil}
          onChange={(e) => setSoil(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="sandy">Sandy</option>
          <option value="loamy">Loamy</option>
          <option value="clay">Clay</option>
          <option value="rocky">Rocky</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">Maintenance Level:</label>
        <select
          value={maintenance}
          onChange={(e) => setMaintenance(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
        Get Recommendations
      </button>
    </form>
  );
}

export default InputForm;
