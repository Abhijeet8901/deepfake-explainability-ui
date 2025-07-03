export const SurveyImageQuestions = [
  {
    type: "scale10",
    question: "How helpful was the <u>complex explanation</u> in understanding why the image is a deepfake?",
    labels: ["Ease of Understanding", "Clarity", "Accuracy"],
  },
  {
    type: "scale10",
    question: "How helpful was the <u>simplified explanation</u> in understanding why the image is a deepfake?",
    labels: ["Ease of Understanding", "Clarity", "Accuracy"],
  },
  {
    type: "binary",
    question: "Which type of explanation would you prefer to use if given as a tool?",
    options: ["Simplified Explanation", "Complex Explanation"],
  },
  {
    type: "likert",
    question: 'The reconstructed image shown below (labeled <i>"What AI Thinks It Should Look Like"</i>) helped me understand why the original image might be manipulated.',
    options: [
      "Strongly Disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly Agree",
    ],
  },
  {
    type: "likert",
    question:
      "Compared to the complex explanation, the simplified explanation reduce the mental effort needed to understand why the image was manipulated.",
    options: [
      "Strongly Disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly Agree",
    ],
  },
];
