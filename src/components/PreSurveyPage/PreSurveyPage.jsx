import React, { useState } from "react";
import { PreSurveyQuestions } from "../../constants/SurveyQuestions";
import SurveyCard from "../SurveyCard/SurveyCard";
import "./PreSurveyPage.css";

const PreSurveyPage = ({ onSubmitPreSurvey }) => {
  const [answers, setAnswers] = useState(Array(PreSurveyQuestions.length).fill(null));

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const allAnswered = answers.every((a) => a !== null);

  const handleSubmit = () => {
    if (allAnswered) {
      onSubmitPreSurvey(answers);
    }
  };

  return (
    <div className="pre-survey-page-container">
      <h2>Before You Begin</h2>
      <p>Please answer a few quick questions before starting the survey.</p>

      <div className="pre-survey-cards-wrapper">
        {PreSurveyQuestions.map((q, idx) => (
          <SurveyCard
            key={idx}
            question={q.question}
            type={q.type}
            options={q.options}
            value={answers[idx]}
            onChange={(val) => handleChange(idx, val)}
            hideNavButtons={true}
          />
        ))}
      </div>

      <button
        className="pre-survey-submit-button"
        onClick={handleSubmit}
        disabled={!allAnswered}
      >
        Start Survey →
      </button>
    </div>
  );
};

export default PreSurveyPage;
