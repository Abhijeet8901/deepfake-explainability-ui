import React, { useEffect, useState } from "react";
import "./HomePage.css";
import SurveyPage from "../SurveyPage/SurveyPage";
import { useSelector, useDispatch } from "react-redux";
import { surveyData } from "../../surveyData";
import { PRELOAD_SURVEY_DATA } from "../../Redux/Store";
import {
  fetchUserProgress,
  logImageAnswers,
  logToolAnswers
} from "../../utilities/SurveyLogger";
import FinalQuestionsPage from "../FinalQuestionsPage/FinalQuestionsPage";
import { PAGES } from "../../constants/Pages";
import EmailPage from "../EmailPage/EmailPage";
import LoadingSurveyPage from "../LoadingSurveyPage/LoadingSurveyPage";
import IntroPage from "../IntroPage/IntroPage";

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(PAGES.INTRO_PAGE);
  const [participantId, setParticipantId] = useState(null);

  const { userProgressData } = useSelector((store) => store);

  const dispatch = useDispatch();

  async function hashEmail(email) {
    const encoder = new TextEncoder();
    const data = encoder.encode(email.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  useEffect(() => {
    if (participantId) {
      dispatch(fetchUserProgress(participantId));
    }
  }, [participantId]);

  useEffect(() => {
    if (userProgressData.lastImageIndex < surveyData.length) {
      setCurrentImageIndex(userProgressData.lastImageIndex);
    } else if (!userProgressData.finalCompleted) {
      setCurrentPage(PAGES.FINAL_QUESTIONS_PAGE);
    } else {
      setCurrentPage(PAGES.THANK_YOU_PAGE);
    }
  }, [userProgressData]);

  useEffect(() => {
    const preload = async () => {
      const complexText = await fetch(
        surveyData[currentImageIndex].complexExplanation
      ).then((res) => res.text());
      const simplifiedText = await fetch(
        surveyData[currentImageIndex].simplifiedExplanation
      ).then((res) => res.text());

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
    if (currentImageIndex < surveyData.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentPage(PAGES.FINAL_QUESTIONS_PAGE);
    }

    await logImageAnswers({
      participantId: participantId,
      imageIndex: surveyData[currentImageIndex].imageIndex,
      answers
    });
  };

  const onSubmitFinal = async (finalAnswers) => {
    setCurrentPage(PAGES.THANK_YOU_PAGE);
    await logToolAnswers({
      participantId: participantId,
      finalAnswers
    });
  };

  const onEmailSubmit = async (email) => {
    const hashedId = await hashEmail(email);

    setParticipantId(hashedId);
    setCurrentPage(PAGES.SURVEY_PAGE);
  };

  const onIntroSubmit = () => {
    setCurrentPage(PAGES.EMAIL_PAGE);
  }

  const renderPage = () => {
    if (userProgressData.loading) {
      return <LoadingSurveyPage />;
    }
    switch (currentPage) {
      case PAGES.INTRO_PAGE:
        return <IntroPage onContinue={onIntroSubmit} />;
      case PAGES.EMAIL_PAGE:
        return <EmailPage onSubmit={onEmailSubmit} />;
      case PAGES.SURVEY_PAGE:
        return (
          <SurveyPage
            currentImage={currentImage}
            currentImageIndex={currentImageIndex}
            onSubmitImage={onSubmitImage}
          />
        );
      case PAGES.FINAL_QUESTIONS_PAGE:
        return <FinalQuestionsPage onSubmitFinal={onSubmitFinal} />;
      case PAGES.THANK_YOU_PAGE:
        return (
          <div className="thank-you-message">
            <h2>Thank you for completing the survey!</h2>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="home-container">{renderPage()}</div>;
};

export default HomePage;
