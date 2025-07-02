export const SurveyImageQuestions = [
  {
    type: "scale10",
    question: "Overall, how helpful was the complex explanation in understanding why the image might be fake or manipulated? (Consider factors such as ease of understanding, clarity, and accuracy.)",
    labels: ["Not helpful at all", "Extremely helpful"],
  },
  {
    type: "scale10",
    question: "Overall, how helpful was the simplified explanation in understanding why the image might be fake or manipulated? (Consider factors such as ease of understanding, clarity, and accuracy.)",
    labels: ["Not helpful at all", "Extremely helpful"],
  },
  {
    type: "binary",
    question: "Which type of explanation would you prefer to use if given as a tool?",
    options: ["Simplified Explanation", "Complex Explanation"],
  },
  {
    type: "likert",
    question: 'The "What Could Have Been" image improved my understanding of why the original image was manipulated.',
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
      "Compared to the complex explanation, did the simplified explanation reduce the mental effort needed to understand why the image was manipulated?",
    options: [
      "Strongly Disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly Agree",
    ],
  },
];
