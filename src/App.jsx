import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Albums from "./Pages/Albums";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Albums />} />
        <Route path="/albums" element={<Albums />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
