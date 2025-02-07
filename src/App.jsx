import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import Review from './Review';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetch and parse the JSON file on mount
  useEffect(() => {
    fetch('/questions.json')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  const handleAnswerSelected = (selectedOption) => {
    const currentQuestion = questions[currentIndex];

    // Record the user's answer
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: currentQuestion, selected: selectedOption }
    ]);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  if (questions.length === 0) {
    return <div className="app-container">Loading questions...</div>;
  }

  return (
    <div className="app-container">
      {!quizCompleted ? (
        <>
          <ProgressBar current={currentIndex} total={questions.length} />
          <QuestionCard
            question={questions[currentIndex]}
            onAnswerSelected={handleAnswerSelected}
          />
        </>
      ) : (
        <Review userAnswers={userAnswers} />
      )}
    </div>
  );
}

export default App;
