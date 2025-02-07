import React from 'react';
import './QuestionCard.css';

function QuestionCard({ question, onAnswerSelected }) {
  return (
    <div className="question-card">
      <h2 className="question-text">{question.question}</h2>
      <div className="options">
        <button onClick={() => onAnswerSelected('A')} className="option-btn">
          {question.optionA}
        </button>
        <button onClick={() => onAnswerSelected('B')} className="option-btn">
          {question.optionB}
        </button>
        <button onClick={() => onAnswerSelected('C')} className="option-btn">
          {question.optionC}
        </button>
        <button onClick={() => onAnswerSelected('D')} className="option-btn">
          {question.optionD}
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
