import React from 'react';
import './SurveyInputs.css';

const TwoChoice = ({ value, onChange, options = ['Yes', 'No'] }) => {
  return (
    <div className="survey-scale-wrapper">
      {options.map((option, index) => (
        <label
          key={index}
          className={`survey-scale-option ${value === option ? 'selected' : ''}`}
        >
          <input
            type="radio"
            name="binary"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default TwoChoice;