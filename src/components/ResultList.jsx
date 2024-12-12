function ResultList({ plants }) {
    if (!plants || plants.length === 0) {
      return <p className="p-4">No specific recommendations for these conditions.</p>;
    }
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Recommended Plants:</h2>
        <ul className="list-disc ml-5">
          {plants.map((plant) => (
            <li key={plant}>{plant}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ResultList;
  