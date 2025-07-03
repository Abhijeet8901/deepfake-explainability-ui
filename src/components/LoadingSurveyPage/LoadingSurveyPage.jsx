import React from "react";
import "./LoadingSurveyPage.css";

const LoadingSurveyPage = () => {
  return (
    <div className="loading-survey-container">
      <div className="spinner" />
      <p className="loading-text">Loading your survey...</p>
    </div>
  );
};

export default LoadingSurveyPage;
