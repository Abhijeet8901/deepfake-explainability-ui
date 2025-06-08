import React from 'react';
import './ImageUploadPage.css';
import wireframeFace from '../../assets/render_images/wireframe-face.png';

const ImageUploadPage = ({ onImageUpload }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="upload-container">
      <div className="left-section">
        <h1>DeepFake Explainability</h1>
        <p>Understand what's real. Upload an image to reveal deepfake evidence.</p>
        <div className="upload-card">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload" className="upload-label">
            <span className="upload-icon">⬆</span>
            <span className="upload-button" >Choose Image</span>
          </label>
        </div>
      </div>
      <div className="right-section">
        <img 
          src={wireframeFace} 
          alt="Wireframe Face" 
          className="face-illustration"
        />
      </div>
    </div>
  );
};

export default ImageUploadPage; 