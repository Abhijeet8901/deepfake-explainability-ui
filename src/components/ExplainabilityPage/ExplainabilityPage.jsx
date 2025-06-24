import React, { useState, useEffect} from 'react';
import './ExplainabilityPage.css';
import { useDispatch, useSelector } from "react-redux";
import { runQwen } from '../../Redux/Qwen/Action';
import { runFakeShieldMFLM } from '../../Redux/FakeShield/Action';
import { runStep1X } from '../../Redux/Step1X/Action';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

const ExplainabilityPage = ({ uploadedImage }) => {

  function dataURLtoFile(dataurl, filename) {
    const [header, b64] = dataurl.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(b64);
    const len = binary.length;
    const u8arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      u8arr[i] = binary.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const formatComplexExplanation = (text) => {
    if (!text) return "";

    const lines = text.split('\n');
    const formattedLines = lines.map(line => {
      if (line.startsWith("1. Whether the picture has been tampered with")) {
        const parts = line.split(":");
        if (parts.length > 1) {
          return "1." + parts.slice(1).join(":").trim();
        }
      }
      return line;
    });

    return formattedLines.join('\n');
  };

  const {qwenData} = useSelector((store) => store);  
  const {fakeShieldData} = useSelector((store) => store);
  const {step1XData} = useSelector((store) => store);

  const dispatch = useDispatch();

  const [showSimplified, setShowSimplified] = useState(false);

  useEffect(() => {
    if (fakeShieldData.complex_explanation) {

      const file = dataURLtoFile(uploadedImage, "upload.png");
      dispatch(runFakeShieldMFLM(file, fakeShieldData.complex_explanation));
      dispatch(runQwen(file, fakeShieldData.complex_explanation));
    }
  }, [fakeShieldData.complex_explanation]);   

  useEffect(()=> {
    if(qwenData.edit_instructions) {
      const file = dataURLtoFile(uploadedImage, "upload.png");
      dispatch(runStep1X(file, qwenData.edit_instructions))
    }
  }, [qwenData.edit_instructions])

  const FIRST_IMAGE = {
    imageUrl: uploadedImage
  }

  const SECOND_IMAGE = {
    imageUrl: step1XData.generated_image 
  }

  return (
    <div className="explainability-container">
      <div className="images-section">
        <div className="image-block layered">
          <h3 className="section-heading">Original Image with Tampered Regions</h3>
          <p className="section-subtext">Pulsing areas on the image indicate where the AI model suspects manipulation.</p>
          <div className="image-stack">
            <img src={uploadedImage} alt="Uploaded" className="base-image" />
            <img src={fakeShieldData.mask} className="mask-layer" />

          </div>
        </div>

        <div className="image-block">
          <h3 className="section-heading">What could have been</h3>
          <p className="section-subtext">Use the slider below to compare the original image with the reconstructed version.</p>
          <ReactBeforeSliderComponent
            firstImage={FIRST_IMAGE}
            secondImage={SECOND_IMAGE}
          />
        </div>
      </div>

      <div className="flip-card-container">
        <div className={`flip-card ${showSimplified ? 'flipped' : ''}`}>
          {/* Front - Complex */}
          <div className="flip-card-front">
            <div className="card-header-with-button">
              <h2>Complex Explanation</h2>
              <button className="card-toggle-button" onClick={() => setShowSimplified(true)}>
                View Simplified Explanations →
              </button>
            </div>
            <pre className="explanation-text">{formatComplexExplanation(fakeShieldData.complex_explanation)}</pre>
          </div>

          {/* Back - Simplified */}
          <div className="flip-card-back">
            <div className="card-header-with-button">
              <h2>Simplified Explanations</h2>
              <button className="card-toggle-button" onClick={() => setShowSimplified(false)}>
                ← Back to Complex Explanation
              </button>
            </div>
            <div className="entity-explanation-header">
              <span>Tampered Region</span>
              <span>Simplified Reason (Why this region looks tampered)</span>
            </div>
            <div className="simplified-pair-container">
              {qwenData.simple_explanation &&
                Object.entries(qwenData.simple_explanation).map(([entity, explanation], idx) => (
                  <div className="entity-explanation-pair" key={idx}>
                    <div className="entity-card">{entity}</div>
                    <div className="explanation-card">{explanation}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainabilityPage;
