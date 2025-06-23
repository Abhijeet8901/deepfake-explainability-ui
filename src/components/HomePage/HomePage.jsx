import React, { useState } from 'react';
import './HomePage.css';
import ImageUploadPage from '../ImageUploadPage/ImageUploadPage';
import ExplainabilityPage from '../ExplainabilityPage/ExplainabilityPage';

const HomePage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (file) => {
    setUploadedImage(file);
  };

  return (
    <div className="home-container">
      {!uploadedImage ? (
        <ImageUploadPage onImageUpload={handleImageUpload} />
      ) : (
        <ExplainabilityPage uploadedImage={uploadedImage} />
      )}
    </div>
  );
};

export default HomePage;