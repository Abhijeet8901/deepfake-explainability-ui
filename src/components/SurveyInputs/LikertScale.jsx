import React from 'react';
import './SurveyInputs.css';

const LikertScale = ({ value, onChange }) => {
  const choices = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree"
]

  return (
    <div className="survey-scale-wrapper">
      {choices.map((number) => (
        <label
          key={number}
          className={`survey-scale-option ${value === number ? 'selected' : ''}`}
        >
          <input
            type="radio"
            name="likert"
            value={number}
            checked={value === number}
            onChange={() => onChange(number)}
          />
          {number}
        </label>
      ))}
    </div>
  );
};

export default LikertScale;