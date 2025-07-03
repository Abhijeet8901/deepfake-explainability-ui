import React, { useState } from "react";
import "./ExplanationFlipCard.css";
import { useSelector } from "react-redux";
import { HelperUtilities } from "../../utilities/HelperUtilities";

const ExplanationFlipCard = ({ onCardFlip, showSimplified }) => {
  const { fakeShieldData } = useSelector((store) => store);
  const { qwenData } = useSelector((store) => store);
  

  return (
    <div className="flip-card-container">
      <div className={`flip-card ${showSimplified ? "flipped" : ""}`}>
        {/* Front - Complex */}
        <div className="flip-card-front">
          <div className="card-header-with-button">
            <h2 className="section-title">🔬 Complex Explanation</h2>
            <button
              className="card-toggle-button"
              onClick={() =>  onCardFlip()}
            >
              View Simplified Explanations →
            </button>
          </div>
          {/* <pre className="explanation-text">{formatComplexExplanation(fakeShieldData.complex_explanation)}</pre> */}
          <div className="complex-explanation-list">
            {(() => {
              const text = HelperUtilities.formatComplexExplanation(
                fakeShieldData.complex_explanation
              );
              const splitIndex = text.indexOf("2.");
              const part1 = text
                .slice(0, splitIndex)
                .replace(/^1\.\s*/, "")
                .trim();
              const part2 = text
                .slice(splitIndex)
                .replace(/^2\.\s*/, "")
                .trim();

              return (
                <>
                  <div className="complex-explanation-card">
                    <div className="complex-explanation-icon">🖼️</div>
                    <div className="complex-explanation-text">
                      <strong>Tampering Description:</strong>
                      <br />
                      {part1}
                    </div>
                  </div>

                  <div className="complex-explanation-card">
                    <div className="complex-explanation-icon">🧠</div>
                    <div className="complex-explanation-text">
                      <strong>Why AI Thinks It's Fake:</strong>
                      <br />
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
            <button
              className="card-toggle-button"
              onClick={() => onCardFlip()}
            >
              ← View Complex Explanation
            </button>
          </div>
          <div className="entity-explanation-header">
            <span>🎯 Tampered Region</span>
            <span>🧠 Why It Feels Off</span>
          </div>
          <div className="simplified-pair-container">
            {Object.keys(qwenData.explanations || {}).length > 0 &&
              Object.entries(qwenData.explanations).map(
                ([entity, { simple_explanation, emoji }], idx) => (
                  <div className="entity-explanation-pair" key={idx}>
                    <div className="entity-card">
                      <span className="emoji">{emoji || "🕵️"}</span> {entity}
                    </div>
                    <div className="explanation-card">{simple_explanation}</div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationFlipCard;
