import { useState } from "react";
import "./App.css";

function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState("");

  const sendDataToBackend = async () => {
    if (number1 === "" || number2 === "") {
      setResult("Please enter both numbers");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number1: Number(number1),
          number2: Number(number2),
        }),
      });

      const data = await response.json();
       setResult(data.result);
    } catch (error) {
      setResult("Backend connection failed");
    }
  };

  return (
    <div className="app">
      <div className="calculator-card">
        <div className="header">
          <span className="badge">FULL STACK PROJECT</span>
          <h1>Calculator</h1>
          <p>React frontend + FastAPI backend</p>
        </div>

        <div className="form">
          <label>First Number</label>
          <input
            type="number"
            placeholder="Enter first number"
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
          />

          <label>Second Number</label>
          <input
            type="number"
            placeholder="Enter second number"
            value={number2}
            onChange={(e) => setNumber2(e.target.value)}
          />

          <button onClick={sendDataToBackend}>
            Calculate
          </button>
        </div>

        <div className="result-box">
          <span>RESULT</span>
          <strong>{result || "—"}</strong>
        </div>

        <div className="footer">
          <span>Frontend: React</span>
          <span>Backend: FastAPI</span>
        </div>
      </div>
    </div>
  );
}

export default App;

