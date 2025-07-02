import React, { useState, useEffect } from "react";
import "./SurveyPage.css";
import { useDispatch, useSelector } from "react-redux";
import { runStep1X } from "../../Redux/Step1X/Action";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { HelperUtilities } from "../../utilities/HelperUtilities";
import ExplanationFlipCard from "../ExplanationFlipCard/ExplanationFlipCard";
import SurveyCard from "../SurveyCard/SurveyCard";
import { SurveyImageQuestions } from "../../constants/SurveyQuestions";

const SurveyPage = ({ uploadedImage }) => {
  const { qwenData } = useSelector((store) => store);
  const { fakeShieldData } = useSelector((store) => store);
  const { step1XData } = useSelector((store) => store);

  const dispatch = useDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = SurveyImageQuestions[currentQuestionIndex];

  const [answers, setAnswers] = useState({});
  const handleAnswerChange = (newValue) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: newValue
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < SurveyImageQuestions.length - 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0)
      setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  useEffect(() => {
    if (qwenData.edit_instructions) {
      const file = HelperUtilities.dataURLtoFile(uploadedImage, "upload.png");
      dispatch(runStep1X(file, qwenData.edit_instructions));
    }
  }, [qwenData.edit_instructions]);

  const FIRST_IMAGE = {
    imageUrl: uploadedImage
  };

  const SECOND_IMAGE = {
    imageUrl: step1XData.generated_image
  };

  const isImageReady = !!step1XData.generated_image;

  return (
    <div className="survey-container">
      <div className="survey-content-wrapper">
        {/* Left Column: Stacked Images */}
        <div className="survey-image-stack-column">
          <div className="survey-image-block layered">
            <h3 className="survey-section-heading">
              🧐 Original Image with Suspected Tampering
            </h3>
            <div className="survey-image-stack">
              <img
                src={uploadedImage}
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
                  src={uploadedImage}
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
          <ExplanationFlipCard />
          <div className="survey-card-container">
            <SurveyCard
                question={currentQuestion.question}
                description={currentQuestion.description}
                type={currentQuestion.type}
                options={currentQuestion.options}
                value={answers[currentQuestionIndex] || null}
                onChange={handleAnswerChange}
                onPrev={handlePrev}
                onNext={handleNext}
                disablePrev={currentQuestionIndex === 0}
                disableNext={currentQuestionIndex === SurveyImageQuestions.length - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
