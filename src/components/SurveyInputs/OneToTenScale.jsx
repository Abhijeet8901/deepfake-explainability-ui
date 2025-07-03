import React from 'react';
import './SurveyInputs.css';

const OneToTenScale = ({ value, onChange, scaleLabel }) => {
  return (
    <div className="survey-scale-wrapper">
      {scaleLabel && <label className="survey-scale-label">{scaleLabel}</label>}
      {[...Array(10)].map((_, i) => {
        const number = i + 1;
        return (
          <label
            key={number}
            className={`survey-scale-option ${value === number ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="scale10"
              value={number}
              checked={value === number}
              onChange={() => onChange(number)}
            />
            {number}
          </label>
        );
      })}
      
    </div>
  );
};

export default OneToTenScale;