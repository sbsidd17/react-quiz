import React, { useEffect } from "react";
import { useState } from "react";
import "../index.css";
import { FaUserCircle } from "react-icons/fa";

function Quiz() {
  // State variables
  const [Quizdata, setQuizdata] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [marked, setMarked] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [markedAndAnswered, setMarkedAndAnswered] = useState(0);


  // API URL
  let url = "https://opentdb.com/api.php?amount=150&category=9&type=multiple";

  // Fetch quiz data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        let temp = [];
        let res = await fetch(url);
        let data = await res.json();
        data.results?.map((item) => {
          item.incorrect_answers.splice(
            ((item.incorrect_answers.length + 1) * Math.random()) | 0,
            0,
            item.correct_answer
          );
          temp.push(item);
          return console.log("first");
        });
        setQuizdata(temp);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Option change handler
  function optionChangeHandler(e) {
    setSelectedOptions((pre) => ({
      ...pre,
      [questionIndex]: e.target.value,
    }));
    setAnsweredQuestions((prev) => [...new Set([...prev, questionIndex])]);
    setAnswered((pre) => pre + 1);
  }

  // Submit handler
  function submitHandler() {
    let r = 0;
    let w = 0;
    let n = 0;
    for (let i = 0; i < Quizdata.length; i++) {
      if (selectedOptions[i] === Quizdata[i].correct_answer) {
        r++;
      } else if (selectedOptions[i] === undefined) {
        n++;
      } else {
        w++;
      }
    }
    console.log(
      `right = ${r}, wrong = ${w}, not answered = ${n}, answered = ${
        r + w
      }, marked = ${marked}, markedAndAnswered = ${markedAndAnswered}`
    );
  }

  // Mark for review handler
  function markForReviewHandler() {
    if (markedForReview.includes(questionIndex)) {
      setMarkedForReview((prev) =>
        prev.filter((item) => item !== questionIndex)
      );
      setMarked((prev) => prev - 1);

      if (selectedOptions[questionIndex] !== undefined) {
        setMarkedAndAnswered((prev) => prev - 1);
      }
    } else {
      setMarkedForReview((prev) => [...prev, questionIndex]);
      setMarked((prev) => prev + 1);

      if (selectedOptions[questionIndex] !== undefined) {
        setMarkedAndAnswered((prev) => prev + 1);
      }
    }
  }

  // Clear response handler
  function clearResponseHandler() {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: undefined,
    }));

    setAnsweredQuestions((prev) => {
      const filteredQuestions = prev.filter((index) => index !== questionIndex);

      // Decrement answered value only if the question was previously answered
      if (prev.length !== filteredQuestions.length) {
        setAnswered((prev) => prev - 1);
      }

      return filteredQuestions;
    });
  }

  // Render quiz component
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="h-[100vh] md:w-[70%] flex flex-col justify-between">
        {/* Quiz Header */}
        <div>
          <div className="flex justify-between items-center border-b-1 shadow-sm p-4">
            <div className="font-bold">{`Question No. ${questionIndex + 1} of ${
              Quizdata.length
            }`}</div>
            <div>
              Marks{" "}
              <span className="bg-green-500 text-white px-2 rounded-xl">
                +2
              </span>{" "}
              <span className="bg-red-700 text-white px-2 rounded-xl">
                -0.5
              </span>{" "}
            </div>
          </div>
          {/* Quiz Questions */}
          <div className="m-5 overflow-y-auto">
            <div className="font-medium">
              {Quizdata.length > 0 && (
                <span dangerouslySetInnerHTML={{ __html: Quizdata[questionIndex]?.question }}></span>
              )}
            </div>
            <div className="m-3">
              {Quizdata.length > 0 &&
                Quizdata[questionIndex].incorrect_answers?.map((item, index) => {
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name={item}
                        value={item}
                        onChange={optionChangeHandler}
                        checked={item === selectedOptions[questionIndex]}
                      />{"  "}
                      <span dangerouslySetInnerHTML={{ __html: item }}></span>
                      <br />
                      <br />
                    </label>
                  );
                })}
            </div>
          </div>
        </div>
        {/* Quiz Controls */}
        <div className="flex justify-between bg-slate-100 border-t-2 p-3">
          <div className="flex flex-col md:flex-row gap-5">
            <button
              className="bg-blue-300 p-2 rounded-md hover:bg-blue-500"
              onClick={markForReviewHandler}
            >
              Mark For Review
            </button>
            <button
              className="bg-blue-300 p-2 rounded-md hover:bg-blue-500"
              onClick={clearResponseHandler}
            >
              Clear Response
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            {questionIndex > 0 && (
              <button
                className="bg-cyan-300 p-2 rounded-md hover:bg-cyan-500 text-white"
                onClick={() => setQuestionIndex((pre) => pre - 1)}
              >
                Previous
              </button>
            )}
            {questionIndex < Quizdata.length - 1 && (
              <button
                className="bg-cyan-300 p-2 rounded-md hover:bg-cyan-500 text-white"
                onClick={() => setQuestionIndex((pre) => pre + 1)}
              >
                Save & Next
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex flex-col justify-between md:w-[30%] h-[100vh] bg-cyan-100 overflow-x-auto ">
        {/* User Details */}
        <div>
          <div className="flex gap-2 items-center p-2 border-b-2">
            <FaUserCircle size={32} color="cyan" />
            <span>UserName</span>
          </div>
          {/* Quiz Statistics */}
          <div className="flex flex-wrap gap-5 p-4">
            <div className="flex items-center">
              <button className="px-2 border bg-green-500  text-white">
                {answered}
              </button>
              <p>Answered</p>
            </div>
            <div className="flex items-center">
              <button className="px-2 border bg-violet-500  text-white">
                {marked}
              </button>
              <p>Marked</p>
            </div>
            <div className="flex items-center">
              <button className="px-2 border bg-violet-500 text-white after:content-['*'] after:ml-0.5 after:text-green-500">
                {markedAndAnswered}
              </button>
              <p>Marked And Answered</p>
            </div>
            <div className="flex items-center">
              <button className="px-2 border bg-white">
                {Quizdata.length - answered}
              </button>
              <p>Not Answered</p>
            </div>
          </div>
          <div className="p-4">Section :</div>
          {/* Quiz Navigation */}
          <div className="flex flex-wrap gap-3 p-4">
            {Quizdata.map((item, index) => {
              const isAnswered = answeredQuestions.includes(index);
              const isMarkedForReview = markedForReview.includes(index);
              const isAnsweredAndMarkedForReview =
                isAnswered && isMarkedForReview;

              return (
                <button
                  id={index}
                  key={index}
                  value={index}
                  className={`px-2 border ${
                    isAnsweredAndMarkedForReview
                      ? `bg-violet-500 text-white after:content-["*"] after:ml-0.5 after:text-green-500`
                      : isAnswered
                      ? "bg-green-500  text-white"
                      : isMarkedForReview
                      ? "bg-violet-500  text-white"
                      : "bg-white"
                  }`}
                  onClick={(e) => setQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
        {/* Submit Button */}
        <div className="p-4">
          <button
            className="bg-cyan-300 p-2 rounded-md hover:bg-cyan-500 text-white w-full"
            onClick={submitHandler}
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
