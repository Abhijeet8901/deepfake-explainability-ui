import React, { useEffect} from 'react';
import './ExplainabilityPage.css';
import { useDispatch, useSelector } from "react-redux";
import { runQwen } from '../../Redux/Qwen/Action';
import { runFakeShieldMFLM } from '../../Redux/FakeShield/Action';
import { runStep1X } from '../../Redux/Step1X/Action';

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

  const {qwenData} = useSelector((store) => store);  
  const {fakeShieldData} = useSelector((store) => store);
  const {step1XData} = useSelector((store) => store);

  const dispatch = useDispatch();

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

  return (
    <div className="explainability-container">
      <div className="images-section">
        <div className="image-block layered">
          <div className="image-stack">
            <img src={uploadedImage} alt="Uploaded" className="base-image" />
            <img src={fakeShieldData.mask} className={`mask-layer `} />
            {/* {manipulatedEntities.map((entity, idx) =>
                <img
                  key={idx}
                  src={entity.mask}
                  className={`mask-layer `}                
                />
            )} */}
          </div>
          {/* <p className="caption">
            {fakeShieldData.complex_explanation}
            { We believe this is a deepfake due to lighting inconsistency and unnatural facial symmetry. }
          </p> */}
        </div>
        <div className="image-block">
          <img src={step1XData.generated_image} alt="Generated" />
          <p className="caption">Our model attempts to reconstruct a more natural version by correcting asymmetry and texture.</p>
        </div>
      </div>

      <div className="manipulated-entities">
        {qwenData.simple_explanation &&
        Object.entries(qwenData.simple_explanation).map(([entity, explanation], idx) => (
          <div className="entity-card" key={idx} >
            <div className="card-header">
              {/* <input type="checkbox" checked={entity.checked} readOnly /> */}
              <h3>{entity}</h3>
            </div>
            <p className="entity-explanation">{explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplainabilityPage;
