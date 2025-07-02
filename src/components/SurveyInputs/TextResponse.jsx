import React from 'react';
import './SurveyInputs.css';

const TextResponse = ({ value, onChange }) => {
  return (
    <textarea
      className="survey-textarea"
      placeholder="Type your answer here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextResponse;