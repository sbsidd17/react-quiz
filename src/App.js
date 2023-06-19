import { Route, Routes } from "react-router-dom";
import "./index.css";
import ChooseExam from "./pages/ChooseExam";
import Home from "./pages/Home";
import Result from "./pages/Result";
import StartQuiz from "./pages/StartQuiz";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-exam" element={<ChooseExam />} />
        <Route path="/start-quiz" element={<StartQuiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
