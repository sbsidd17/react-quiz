import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ChooseExam() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [questionCount, setQuestionCount] = useState("");

  useEffect(() => {
    async function fatchCatagory() {
      let res = await fetch("https://opentdb.com/api_category.php");
      let data = await res.json();
      setCategories(data.trivia_categories);
    }

    fatchCatagory();

    // eslint-disable-next-line
  }, []);

  function handleSelect(e) {
    const { name, value, selectedIndex } = e.target;

    if (name === "category") {
      const selectedOption = e.target.options[selectedIndex];
      const cname = selectedOption.getAttribute("data-cname");

      setCategoryName(cname);
      setCategoryId(value);
    }
    if (name === "question") {
      setQuestionCount(value);
    }
  }

  return (
    <div>
      
      <div>
        <select onChange={handleSelect} name="category">
          <option value="">Select Category</option>
          {categories.map((item) => {
            return (
              <option key={item.name} data-cname={item.name} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      
      <div>
        <select onChange={handleSelect} name="question">
        <option value="0">Select Questions Number</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
      <div>
        {categoryId && questionCount && (
          <Link
            to={"/start-quiz"}
            state={{
              categoryId: categoryId,
              categoryName: categoryName,
              questionCount: questionCount,
            }}
          >
            Start Exam
          </Link>
        )}
      </div>
    </div>
  );
}

export default ChooseExam;
