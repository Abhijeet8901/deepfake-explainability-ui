import React from 'react';
import './SurveyInputs.css';

const LikertScale = ({ value, onChange, options }) => {

  return (
    <div className="survey-scale-wrapper">
      {options.map((number) => (
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