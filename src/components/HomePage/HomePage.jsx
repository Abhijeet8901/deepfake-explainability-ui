import React, { useEffect, useState } from "react";
import "./HomePage.css";
import SurveyPage from "../SurveyPage/SurveyPage";
import { useSelector, useDispatch } from "react-redux";
import { surveyData } from "../../surveyData";
import { PRELOAD_SURVEY_DATA } from "../../Redux/Store";
import { logImageAnswers } from "../../utilities/SurveyLogger";

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [answeredImages, setAnsweredImages] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const preload = async () => {

      const complexText = await fetch(surveyData[currentImageIndex].complexExplanation).then((res) =>
        res.text()
      );
      const simplifiedText = await fetch(surveyData[currentImageIndex].simplifiedExplanation).then((res) =>
        res.text()
      );

      dispatch({
        type: PRELOAD_SURVEY_DATA,
        currentImage: {
          reconstructedImage: surveyData[currentImageIndex].reconstructedImage,
          simplifiedExplanation: simplifiedText,
          complexExplanation: complexText
        }
      });

      setCurrentImage(surveyData[currentImageIndex].originalImage);
    };

    preload();
  }, [currentImageIndex]);

  const onSubmitImage = async (answers) => {
    setAnsweredImages(prev => ({
      ...prev,
      [currentImageIndex]: answers
    }));

    if (currentImageIndex < surveyData.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      // optionally move to final questions
    }

    await logImageAnswers({
      participantId: "participant_123",
      imageIndex: surveyData[currentImageIndex].imageIndex,
      answers
    });

  }


  return (
    <div className="home-container">
      <SurveyPage 
        currentImage={currentImage}
        currentImageIndex={currentImageIndex}
        onSubmitImage={onSubmitImage}
      />
    </div>
  );
};

export default HomePage;
