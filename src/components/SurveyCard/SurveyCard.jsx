import React from "react";
import LikertScale from "../SurveyInputs/LikertScale";
import OneToTenScale from "../SurveyInputs/OneToTenScale";
import TwoChoice from "../SurveyInputs/TwoChoice";
import TextResponse from "../SurveyInputs/TextResponse";
import "./SurveyCard.css";

const SurveyCard = ({
  question,
  type,
  options = [],
  labels = [],
  onChange,
  value,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
  hideNavButtons = false,
}) => {
  const renderInput = (label = null, index = null) => {
    switch (type) {
      case "likert":
        return (
          <LikertScale
            onChange={(number) => onChange(number, type)}
            value={value}
          />
        );
      case "scale10":
        return (
          <OneToTenScale
            onChange={(number) => onChange(number, type, index)}
            value={value[index]}
            scaleLabel={label}
          />
        );
      case "binary":
        return (
          <TwoChoice
            options={options}
            onChange={(number) => onChange(number, type)}
            value={value}
          />
        );
      case "text":
        return (
          <TextResponse
            onChange={(number) => onChange(number, type)}
            value={value}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="survey-card">
      <h3
        className="survey-card-title"
        dangerouslySetInnerHTML={{ __html: question }}
      ></h3>
      <div className="survey-card-input-wrapper">
         {type === "scale10" && labels.length > 1 && (
          <div className="survey-scale-labels-row">
            <label className="survey-scale-label"></label>
            <div className="survey-upper-labels">
            <div className="scale-end-label">Least Helpful</div>
            <div className="scale-end-label">Most Helpful</div>
             </div>
          </div>
        )}
        {(() => {
          if (labels.length === 0) return renderInput();
          else {
            return labels.map((label, index) => (
              <React.Fragment key={index}>
                {renderInput(label, index)}
              </React.Fragment>
            ));
          }
        })()}
      </div>
      {!hideNavButtons && (
        <div className="survey-nav-inline">
          <button onClick={onPrev} disabled={disablePrev}>
            ←
          </button>
          <button onClick={onNext} disabled={disableNext}>
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default SurveyCard;
