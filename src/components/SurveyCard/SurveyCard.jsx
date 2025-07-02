import React from 'react';
import LikertScale from '../SurveyInputs/LikertScale';
import OneToTenScale from '../SurveyInputs/OneToTenScale';
import TwoChoice from '../SurveyInputs/TwoChoice';
import TextResponse from '../SurveyInputs/TextResponse';
import './SurveyCard.css';

const SurveyCard = ({
  question,
  description,
  type,
  options = [],
  onChange,
  value,
  onPrev,
  onNext,
  disablePrev,
  disableNext
}) => {
  const renderInput = () => {
    switch (type) {
      case 'likert':
        return <LikertScale onChange={onChange} value={value} />;
      case 'scale10':
        return <OneToTenScale onChange={onChange} value={value} />;
      case 'binary':
        return <TwoChoice options={options} onChange={onChange} value={value} />;
      case 'text':
        return <TextResponse onChange={onChange} value={value} />;
      default:
        return null;
    }
  };

  return (
    <div className="survey-card">
      <h3 className="survey-card-title">{question}</h3>
      <div className="survey-card-input-wrapper">
        {renderInput()}
      </div>
      <div className="survey-nav-inline">
        <button onClick={onPrev} disabled={disablePrev}>←</button>
        <button onClick={onNext} disabled={disableNext}>→</button>
      </div>
    </div>
  );
};

export default SurveyCard;
