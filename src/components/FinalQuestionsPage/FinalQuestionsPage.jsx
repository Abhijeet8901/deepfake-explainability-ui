import React, { useState } from "react";
import SurveyCard from "../SurveyCard/SurveyCard";
import { SurveyToolQuestions } from "../../constants/SurveyQuestions";
import "./FinalQuestionsPage.css";

const FinalQuestionsPage = ({ onSubmitFinal }) => {
  const [answers, setAnswers] = useState({"2": ""});

  const handleAnswerChange = (index, value) => {
    setAnswers(prev => ({
      ...prev,
      [index]: value,
    }));
  };

  const allAnswered = SurveyToolQuestions.every((q, index) => {
    if (q.type === "text") return true; 
    const ans = answers[index];
    if (Array.isArray(ans)) return ans.every((a) => a !== null && a !== undefined);
    return ans !== null && ans !== undefined;
  });


  return (
    <div className="final-questions-page">
      <h2 className="final-title">Final Survey Questions</h2>

      {SurveyToolQuestions.map((q, index) => (
        <SurveyCard
          key={index}
          question={q.question}
          description={q.description}
          type={q.type}
          options={q.options}
          value={answers[index] || null}
          onChange={(val) => handleAnswerChange(index, val)}
          hideNavButtons={true}
        />
      ))}

      <div className="final-submit-container">
        <button
          className="submit-button"
          disabled={!allAnswered}
          onClick={()=> onSubmitFinal(answers)}
        >
          Submit Responses
        </button>
      </div>
    </div>
  );
};

export default FinalQuestionsPage;
