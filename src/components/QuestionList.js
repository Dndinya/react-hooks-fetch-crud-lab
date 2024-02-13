import React from "react";
// import {questions} from '../db.json'

function QuestionList({questions}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* <ul>{questions.map(question => (
          <li key={question.id}>
            {questions.prompt}
          </li>
        ))}</ul> */}
    </section>
  );
}


export default QuestionList;
