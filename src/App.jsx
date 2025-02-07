import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import Review from './Review';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  // New state for when a user chooses to review a specific question.
  const [reviewingQuestion, setReviewingQuestion] = useState(false);
  const [reviewQuestionIndex, setReviewQuestionIndex] = useState(null);

  useEffect(() => {
    fetch('/questions.json')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  const handleAnswerSelected = (selectedOption) => {
    const currentQuestion = questions[currentIndex];

    // Record the user's answer.
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

  // When a "View Question" link is clicked in the review list.
  const handleReviewQuestion = (index) => {
    setReviewQuestionIndex(index);
    setReviewingQuestion(true);
  };

  // Called from the review question view to return to the review list.
  const handleExitReviewQuestion = () => {
    setReviewingQuestion(false);
  };

  // (Optional) A back button in the review list to go back to the quiz view.
  // In this example, we'll let the user return to the quiz at the last answered question.
  const handleExitReview = () => {
    // For example, resume the quiz at the last answered question.
    setQuizCompleted(false);
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
      ) : reviewingQuestion ? (
        // Display a single question in review mode.
        <QuestionCard
          question={questions[reviewQuestionIndex]}
          reviewMode={true}
          onExitReviewQuestion={handleExitReviewQuestion}
        />
      ) : (
        // Show the review list.
        <Review
          userAnswers={userAnswers}
          onReviewQuestion={handleReviewQuestion}
          onExitReview={handleExitReview}
        />
      )}
    </div>
  );
}

export default App;
