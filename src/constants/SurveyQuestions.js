import { type } from "@testing-library/user-event/dist/type";

export const SurveyImageQuestions = [
  {
    type: "scale10",
    question: "1) How helpful was the <u>complex explanation</u> in understanding why the image is a deepfake?",
    labels: ["Ease of Understanding", "Clarity", "Accuracy"],
  },
  {
    type: "scale10",
    question: "2) How helpful was the <u>simplified explanation</u> in understanding why the image is a deepfake?",
    labels: ["Ease of Understanding", "Clarity", "Accuracy"],
  },
  {
    type: "binary",
    question: "3) Which type of explanation would you prefer to use if given as a tool?",
    options: ["Simplified Explanation", "Complex Explanation"],
  },
  {
    type: "likert",
    question: '4) The reconstructed image shown on the bottom left of the screen (labeled <i>"🧠 What AI Thinks It Should Look Like"</i>) helped me understand why the original image might be manipulated.',
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
      "5) Compared to the complex explanation, the simplified explanation reduced the mental effort needed to understand why the image was manipulated.",
    options: [
      "Strongly Disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly Agree",
    ],
  },
];

export const SurveyToolQuestions = [
  {
    type: "likert",
    question: "1) Using this tool increased my confidence in identifying deepfake images.",
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
    question: "2) If available, how likely are you to use a tool like this in real-world scenarios (e.g., checking images on social media or news websites).",
     options: [
      "Strongly Disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly Agree",
    ],
  },
  {
    type: "text",
    question: "3) Do you have any suggestions or feedback for improving the tool or survey?",
  },
];