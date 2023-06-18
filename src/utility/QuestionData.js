let url = "https://opentdb.com/api.php?amount=10&category=9&type=multiple"

export async function getQuizData() {
  let Quizdata1 = [];
  let res = await fetch(url);
  let data = await res.json();
  Quizdata1 = data.results.map((item) => {
    item.incorrect_answers.splice(((item.incorrect_answers.length + 1) * Math.random()) | 0, 0, item.correct_answer);
    return item;
  });

  return Quizdata1;
}


export const Quizdata = [
    {
        id : 1,
        question : "This is Question Number 1",
        options : [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        right_answer : "Option 2"
    },
    {
        id : 2,
        question : "This is Question Number 2",
        options : [
            "Option 2 ",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        right_answer : "Option 2"
    },
    {
        id : 3,
        question : "This is Question Number 3",
        options : [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        right_answer : "Option 1"
    },
    {
        id : 4,
        question : "This is Question Number 4",
        options : [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        right_answer : "Option 4"
    },
    {
        id : 5,
        question : "This is Question Number 5",
        options : [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        right_answer : "Option 2"
    },
    {
        id : 6,
        question : "This is Question Number 6",
        options : [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        right_answer : "Option 3"
    },
]