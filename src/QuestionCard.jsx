import React from 'react';
import './QuestionCard.css';

function QuestionCard({ question, onAnswerSelected, reviewMode, onExitReviewQuestion }) {
  return (
    <div className="question-card">
      {reviewMode && (
        <button onClick={onExitReviewQuestion} className="back-review-btn">
          Back to Review
        </button>
      )}
      {question.paragraph && (
        <p
          className="question-paragraph"
          dangerouslySetInnerHTML={{ __html: question.paragraph }}
        ></p>
      )}
      <h2
        className="question-text"
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></h2>
      <div className="options">
        <button
          onClick={() => onAnswerSelected && onAnswerSelected('A')}
          className="option-btn"
          disabled={reviewMode}
        >
          {question.optionA}
        </button>
        <button
          onClick={() => onAnswerSelected && onAnswerSelected('B')}
          className="option-btn"
          disabled={reviewMode}
        >
          {question.optionB}
        </button>
        <button
          onClick={() => onAnswerSelected && onAnswerSelected('C')}
          className="option-btn"
          disabled={reviewMode}
        >
          {question.optionC}
        </button>
        <button
          onClick={() => onAnswerSelected && onAnswerSelected('D')}
          className="option-btn"
          disabled={reviewMode}
        >
          {question.optionD}
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
