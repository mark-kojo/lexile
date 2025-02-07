import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetch and parse the CSV file when the component mounts
  useEffect(() => {
    fetch('/questions.csv')
      .then(response => response.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          complete: (results) => {
            // Filter out any empty rows
            const parsedQuestions = results.data.filter(q => q.question);
            setQuestions(parsedQuestions);
          }
        });
      });
  }, []);

  const handleAnswerSelected = (selectedOption) => {
    const currentQuestion = questions[currentIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  if (questions.length === 0) {
    return <div className="app-container">Loading questions...</div>;
  }

  return (
    <div className="app-container">
      <ProgressBar current={currentIndex} total={questions.length} />
      {!quizCompleted ? (
        <QuestionCard
          question={questions[currentIndex]}
          onAnswerSelected={handleAnswerSelected}
        />
      ) : (
        <div className="score">
          Quiz Completed! Your score: {score} / {questions.length}
        </div>
      )}
    </div>
  );
}

export default App;
