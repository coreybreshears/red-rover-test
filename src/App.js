import "./App.css";
import { Routes, Route } from "react-router-dom";
import Decoder from "./components/Decoder/Decoder";
import Main from "./components/main";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/decode" element={<Decoder />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
