import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { EntrancePage } from "./Pages/EntrancePage/EntrancePage";
import { HomePage } from "./Pages/HomePage/HomePage";
import { WebSocketProvider } from "./Hooks/WebSocketContext"

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<EntrancePage />} />
            <Route path="/Home" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </WebSocketProvider>
  );
}

export default App;
