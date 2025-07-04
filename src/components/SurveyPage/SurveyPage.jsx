import React, { useState } from "react";
import "./SurveyPage.css";
import { useSelector } from "react-redux";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import ExplanationFlipCard from "../ExplanationFlipCard/ExplanationFlipCard";
import SurveyCard from "../SurveyCard/SurveyCard";
import { SurveyImageQuestions } from "../../constants/SurveyQuestions";
import { surveyData } from "../../surveyData"; 

const SurveyPage = ({ currentImage, currentImageIndex, onSubmitImage }) => {
  const { qwenData } = useSelector((store) => store);
  const { fakeShieldData } = useSelector((store) => store);
  const { step1XData } = useSelector((store) => store);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [explanabilityCardFlipped, setExplanabilityCardExplained] =
    useState(false);
  const [imageAnalysed, setImageAnalyzed] = useState(false);
  const [showSimplified, setShowSimplified] = useState(false);

  const currentQuestion = SurveyImageQuestions[currentQuestionIndex];

  const handleAnswerChange = (newValue, type, index) => {
    if (type === "scale10") {
      const currVal = answers[currentQuestionIndex] || [null, null, null];
      currVal[index] = newValue;
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: currVal
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: newValue
      }));
    }
  };

  const allAnswered = SurveyImageQuestions.every((_, idx) => {
    const ans = answers[idx];
    if (Array.isArray(ans)) {
      return ans.every((item) => item !== null && item !== undefined);
    } else {
      return ans !== null && ans !== undefined;
    }
  });

  const handleNext = () => {
    if (currentQuestionIndex < SurveyImageQuestions.length - 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0)
      setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const onCardFlip = () => {
    setShowSimplified(!showSimplified);
    setExplanabilityCardExplained(true);
  };

  const FIRST_IMAGE = {
    imageUrl: currentImage
  };

  const SECOND_IMAGE = {
    imageUrl: step1XData.generated_image
  };

  const isImageReady = !!step1XData.generated_image;

  return (
    <div className="survey-container">
      <div className="survey-progress-bar-container">
        <div
          className="survey-progress-bar-fill"
          style={{
            width: `${
              ((currentImageIndex + 1) / surveyData.length) * 100
            }%`
          }}
        />
      </div>
      <div className="survey-content-wrapper">
        {/* Left Column: Stacked Images */}
        <div className="survey-image-stack-column">
          <div className="survey-image-block layered">
            <h3 className="survey-section-heading">
              🧐 Original Image with Suspected Tampering
            </h3>
            <div className="survey-image-stack">
              <img
                src={currentImage}
                alt="Uploaded"
                className="survey-base-image"
              />
              <img src={fakeShieldData.mask} className="survey-mask-layer" />
            </div>
            {Object.keys(qwenData.explanations || {}).length > 0 && (
              <p className="survey-section-subtext">
                👁️ Look at the{" "}
                <strong>
                  {(() => {
                    const entities = Object.keys(qwenData.explanations || {});
                    if (entities.length === 0) return "";
                    if (entities.length === 1) return entities[0];
                    return (
                      entities.slice(0, -1).join(", ") +
                      " and " +
                      entities[entities.length - 1]
                    );
                  })()}
                </strong>
              </p>
            )}
          </div>

          <div className="survey-image-block">
            <h3 className="survey-section-heading">
              🧠 What AI Thinks It *Should* Look Like
            </h3>
            {isImageReady ? (
              <ReactBeforeSliderComponent
                firstImage={FIRST_IMAGE}
                secondImage={SECOND_IMAGE}
              />
            ) : (
              <div className="reconstruction-loading-wrapper">
                <img
                  src={currentImage}
                  alt="Uploaded"
                  className="background-image"
                />
                <div className="reconstruction-overlay">
                  <div className="shimmer-layer"></div>
                </div>
              </div>
            )}
            <p className="survey-section-subtext">
              {isImageReady
                ? "🔍 The AI cleaned up suspicious parts to show you what might have been real."
                : "⏳ Reconstructing the untampered version..."}
            </p>
          </div>
        </div>

        {/* Right Column: Explanation and Question */}
        <div className="explanation-column">
          <ExplanationFlipCard onCardFlip={onCardFlip} showSimplified={showSimplified} />
          {imageAnalysed ? (
            <div className="survey-card-container">
              <SurveyCard
                question={currentQuestion.question}
                type={currentQuestion.type}
                options={currentQuestion.options}
                labels={currentQuestion.labels}
                value={
                  answers[currentQuestionIndex] ||
                  (currentQuestion.type === "scale10"
                    ? [null, null, null]
                    : null)
                }
                onChange={handleAnswerChange}
                onPrev={handlePrev}
                onNext={handleNext}
                disablePrev={currentQuestionIndex === 0}
                disableNext={
                  currentQuestionIndex === SurveyImageQuestions.length - 1
                }
              />
            </div>
          ) : (
            <div className="survey-analyzed-button-container">
              <button
                className="survey-analyze-button"
                disabled={!explanabilityCardFlipped}
                onClick={() => {
                  setImageAnalyzed(true);
                }}
              >
                Answer Questions
              </button>
            </div>
          )}

          <button
            className="survey-submit-button"
            disabled={!allAnswered}
            onClick={() => {
              onSubmitImage(answers);
              setAnswers({});
              setCurrentQuestionIndex(0);
              setImageAnalyzed(false);
              setExplanabilityCardExplained(false);
              setShowSimplified(false);
            }}
          >
            Submit & Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
