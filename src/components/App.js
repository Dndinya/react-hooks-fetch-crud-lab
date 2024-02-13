import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:4000/questions');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  useEffect(() => {
    // Fetch questions from the server when the component mounts
    fetchQuestions();
  }, []);

  const addQuestion = async (newQuestion) => {
    try {
      const response = await fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuestion)
      });
      if (!response.ok) {
        throw new Error('Failed to add question');
      }
      const data = await response.json();
      setQuestions([...questions, data]);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete question');
      }
      setQuestions(questions.filter(question => question.id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const updateCorrectAnswer = async (id, correctIndex) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correctIndex })
      });
      if (!response.ok) {
        throw new Error('Failed to update correct answer');
      }
      const updatedQuestion = { ...questions.find(question => question.id === id), correctIndex };
      setQuestions(questions.map(question => question.id === id ? updatedQuestion : question));
    } catch (error) {
      console.error('Error updating correct answer:', error);
    }
  };


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList onChangePage={fetchQuestions}/>}
      <QuestionList  />
    </main>
  );
}

export default App;
