import React from 'react';
import './Review.css';

function Review({ userAnswers, onReviewQuestion, onExitReview }) {
  // Helper function to retrieve the full answer text from a question object given a letter.
  const getAnswerText = (question, letter) => {
    switch (letter) {
      case "A": return question.optionA;
      case "B": return question.optionB;
      case "C": return question.optionC;
      case "D": return question.optionD;
      default: return "";
    }
  };

  // Calculate overall score.
  const score = userAnswers.filter(
    (answer) => answer.selected === answer.question.correctAnswer
  ).length;

  return (
    <div className="review">
      <h3 className="mb-0">Quiz Completed!</h3>
      <h2 className="mt-0">Your score: {score} / {userAnswers.length}</h2>
      {/* (Optional) Back button to exit review and return to quiz */}
      <h3>Review Your Answers:</h3>
      {userAnswers.map((answer, index) => {
        const isCorrect = answer.selected === answer.question.correctAnswer;
        return (
          <div
            key={index}
            className={`review-item ${isCorrect ? "correct-border" : "incorrect-border"}`}
          >
            <p>
              <strong>Q{index + 1}:</strong> {answer.question.question}
            </p>
            <p>
              Your answer: {getAnswerText(answer.question, answer.selected)} ({answer.selected}){" "}
              {isCorrect ? (
                <span className="correct">✅</span>
              ) : (
                <span className="incorrect">❌</span>
              )}
            </p>
            {!isCorrect && (
              <p>
                Correct answer: {getAnswerText(answer.question, answer.question.correctAnswer)} ({answer.question.correctAnswer})
              </p>
            )}
            <p className="feedback">
              <strong>Feedback:</strong> {answer.question.feedback}
            </p>
            <p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onReviewQuestion(index);
                }}
              >
                View Question
              </a>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Review;
