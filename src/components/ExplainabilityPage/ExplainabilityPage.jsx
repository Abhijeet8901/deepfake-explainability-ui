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
          <h3 className="section-heading">🧐 Original Image with Suspected Tampering</h3>
          {/* <p className="section-subtext">🔍 The glowing areas show where the AI thinks something's fishy.</p> */}
          <div className="image-stack">
            <img src={uploadedImage} alt="Uploaded" className="base-image" />
            <img src={fakeShieldData.mask} className="mask-layer" />
          </div>
          {Object.keys(qwenData.explanations || {}).length > 0 && (
            <p className="section-subtext">
              👁️ Look at the <strong>
                {(() => {
                  const entities = Object.keys(qwenData.explanations || {});
                  if (entities.length === 0) return '';
                  if (entities.length === 1) return entities[0];
                  return entities.slice(0, -1).join(', ') + ' and ' + entities[entities.length - 1];
                })()}
              </strong>
            </p>

          )}

        </div>

        <div className="image-block">
          <h3 className="section-heading">🧠 What AI Thinks It *Should* Look Like</h3>
          {/* <p className="section-subtext">🖱️ Slide to compare the original and reconstructed versions.</p> */}
          <ReactBeforeSliderComponent
            firstImage={FIRST_IMAGE}
            secondImage={SECOND_IMAGE}
          />
          <p className="section-subtext">
            🔍 The AI cleaned up suspicious parts to show you what might have been real.
          </p>
        </div>
      </div>

      <div className="flip-card-container">
        <div className={`flip-card ${showSimplified ? 'flipped' : ''}`}>
          {/* Front - Complex */}
          <div className="flip-card-front">
            <div className="card-header-with-button">
              <h2 className="section-title">🔬 Complex Explanation</h2>
              <button className="card-toggle-button" onClick={() => setShowSimplified(true)}>
                View Simplified Explanations →
              </button>
            </div>
            {/* <pre className="explanation-text">{formatComplexExplanation(fakeShieldData.complex_explanation)}</pre> */}
            <div className="complex-explanation-list">
              {(() => {
                const text = formatComplexExplanation(fakeShieldData.complex_explanation);
                const splitIndex = text.indexOf('2.');
                const part1 = text.slice(0, splitIndex).replace(/^1\.\s*/, '').trim();
                const part2 = text.slice(splitIndex).replace(/^2\.\s*/, '').trim();

                return (
                  <>
                    <div className="complex-explanation-card">
                      <div className="complex-explanation-icon">🖼️</div>
                      <div className="complex-explanation-text">
                        <strong>Tampering Description:</strong><br />
                        {part1}
                      </div>
                    </div>

                    <div className="complex-explanation-card">
                      <div className="complex-explanation-icon">🧠</div>
                      <div className="complex-explanation-text">
                        <strong>Why AI Thinks It's Fake:</strong><br />
                        <pre>{part2}</pre>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Back - Simplified */}
          <div className="flip-card-back">
            <div className="card-header-with-button">
              <h2 className="section-title">✨ Simplified Explanations</h2>
              <button className="card-toggle-button" onClick={() => setShowSimplified(false)}>
                ← Back to Complex Explanation
              </button>
            </div>
            <div className="entity-explanation-header">
              <span>🎯 Tampered Region</span>
              <span>🧠 Why It Feels Off</span>
            </div>
            <div className="simplified-pair-container">
              {Object.keys(qwenData.explanations || {}).length > 0 &&
                Object.entries(qwenData.explanations).map(([entity, {simple_explanation, emoji}], idx) => (
                  <div className="entity-explanation-pair" key={idx}>
                    <div className="entity-card">
                      <span className="emoji">{emoji || '🕵️'}</span> {entity}
                    </div>
                    <div className="explanation-card">{simple_explanation}</div>
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
