import { useEffect, useState } from "react";

function App() {
  const [tables, setTables] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/") 
      .then((response) => response.json()) 
      .then((data) => {
        setTables(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen bg-zinc-900">
      
      {loading && <p className="text-white">Loading tables...</p>}
  
      {error && <p className="text-red-500">{error}</p>}

      <ul className="text-white">
        {tables.map((table, index) => (
          <li key={index} >
            {Object.values(table)} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
