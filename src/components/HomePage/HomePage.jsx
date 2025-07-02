import React, { useState } from 'react';
import './HomePage.css';
import ImageUploadPage from '../ImageUploadPage/ImageUploadPage';
import ExplainabilityPage from '../ExplainabilityPage/ExplainabilityPage';
import LoadingExplanationPage from '../LoadingExplanationPage/LoadingExplanationPage';
import SurveyPage from '../SurveyPage/SurveyPage';
import { useSelector } from "react-redux";

const HomePage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const { explanations: qwenExplanations} = useSelector((store) => store.qwenData);

  const qwenDataLoaded = Object.keys(qwenExplanations || {}).length > 0;

  const handleImageUpload = (file) => {
    setUploadedImage(file);
  };


  return (
    <div className="home-container">
      {!uploadedImage ? (
        <ImageUploadPage onImageUpload={handleImageUpload} />
      ) : !qwenDataLoaded ? (
        <LoadingExplanationPage uploadedImage={uploadedImage} />
      ) : (
        <SurveyPage uploadedImage={uploadedImage} />
      )
      }
    </div>
  );
};

export default HomePage;