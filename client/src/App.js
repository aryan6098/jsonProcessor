import { useState } from "react";
import axios from "axios";
import Select from "react-select";

const BACKEND_URL = "http://localhost:8200/bfhl";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  document.title = "React Task";

  // Options for the Multi-Select Dropdown
  const filterOptions = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  // Handle JSON input submission
  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data) throw new Error("Invalid JSON structure");

      const res = await axios.post(BACKEND_URL, parsedData);
      setResponse(res.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  return (
    <div className="container">
      <h1>JSON Processor</h1>

      {/* JSON Input Field */}
      <textarea
        rows="4"
        placeholder='Enter JSON (e.g. {"data": ["A", "1", "C"]})'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p className="error">{error}</p>}

      {response && (
        <>
          <h3>Select Data to Display:</h3>
          <Select
            isMulti
            options={filterOptions}
            onChange={setSelectedFilters}
            placeholder="Select Data Categories"
          />

          <div className="response">
            {selectedFilters.some((option) => option.value === "alphabets") && (
              <p>
                <strong>Alphabets:</strong> {JSON.stringify(response.alphabets)}
              </p>
            )}
            {selectedFilters.some((option) => option.value === "numbers") && (
              <p>
                <strong>Numbers:</strong> {JSON.stringify(response.numbers)}
              </p>
            )}
            {selectedFilters.some(
              (option) => option.value === "highest_alphabet"
            ) && (
              <p>
                <strong>Highest Alphabet:</strong>{" "}
                {JSON.stringify(response.highest_alphabet)}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
