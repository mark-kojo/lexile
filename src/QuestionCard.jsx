import React, { useState } from 'react';
import './QuestionCard.css';

function QuestionCard({ question, onAnswerSelected, reviewMode, onExitReviewQuestion }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswerClick = (option) => {
    // Prevent multiple clicks during the animation.
    if (isAnimating || reviewMode) return;

    setIsAnimating(true);

    // Optionally, you can add an extra CSS class here to trigger a manual animation.
    // But if you're using :active to animate, the user will see the effect when they tap.

    // Delay the callback until after the animation has finished.
    setTimeout(() => {
      onAnswerSelected && onAnswerSelected(option);
    }, 400); // 200ms delay – adjust to match your CSS animation duration
  };

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
          onClick={() => handleAnswerClick('A')}
          className="option-btn"
          disabled={reviewMode || isAnimating}
        >
          {question.optionA}
        </button>
        <button
          onClick={() => handleAnswerClick('B')}
          className="option-btn"
          disabled={reviewMode || isAnimating}
        >
          {question.optionB}
        </button>
        <button
          onClick={() => handleAnswerClick('C')}
          className="option-btn"
          disabled={reviewMode || isAnimating}
        >
          {question.optionC}
        </button>
        <button
          onClick={() => handleAnswerClick('D')}
          className="option-btn"
          disabled={reviewMode || isAnimating}
        >
          {question.optionD}
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
