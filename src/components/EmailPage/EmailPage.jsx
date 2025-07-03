import React, { useState } from "react";
import "./EmailPage.css"; // optional styling

const EmailPage = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    onSubmit(email); // pass the email up to parent
  };

    return (
    <div className="email-page-container">
      <h2>Enter your Email to Begin</h2>
      <p>
        We use your email only to save your progress in case you take a break and return later. <b>Your email is never stored or accessible to us.</b>
      </p>

      <input
        className="email-input"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {error && <div className="email-error">{error}</div>}

      <button className="email-submit-btn" onClick={handleSubmit}>
        Start Survey
      </button>
    </div>
  );
};

export default EmailPage;
