import React from "react";
import { useLocation } from "react-router-dom";
import Quiz from "../components/Quiz";
import QuizHeader from "../components/QuizHeader";

function StartQuiz() {
  const location = useLocation();

  const { categoryId, categoryName, questionCount } = location.state;
  //   console.log(categoryId, categoryName, questionCount);

  return (
    <div className="h-[100vh] w-[100vw]">
      <QuizHeader />

      <Quiz
        categoryId={categoryId}
        questionCount={questionCount}
        categoryName={categoryName}
      />
    </div>
  );
}

export default StartQuiz;
