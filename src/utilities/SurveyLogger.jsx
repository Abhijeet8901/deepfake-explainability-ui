import { GET_USER_PROGRESS_REQUEST, GET_USER_PROGRESS_SUCCESS } from "../Redux/UserProgress/ActionType";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx9RqC8UZ40BSbxImRJ3hU3SqLZl4YtLt5N37ohzj3IDA-ESKbbRLMcNgF8GtxkidW7/exec";

// Log answers for a single image

export const logImageAnswers = async ({
  participantId,
  imageIndex,
  answers
}) => {
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        `participantId=${participantId}&imageIndex=${imageIndex}&type=image&` +
        `answer0=${answers[0] || ""}&` +
        `answer1=${answers[1] || ""}&` +
        `answer2=${answers[2] || ""}&` +
        `answer3=${answers[3] || ""}&` +
        `answer4=${answers[4] || ""}`
    });
  } catch (err) {
    console.error("Error logging image answers:", err);
  }
};

// Log final survey answers
export const logToolAnswers = async ({ participantId, finalAnswers }) => {
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        `participantId=${participantId}&type=tool&` +
        `answer0=${finalAnswers[0] || ""}&` +
        `answer1=${finalAnswers[1] || ""}&` +
        `answer2=${finalAnswers[2] || ""}`
    });
  } catch (err) {
    console.error("Error logging final answers:", err);
  }
};

export const logPreSurveyAnswers = async ({ participantId, preSurveyAnswers }) => {
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        `participantId=${participantId}&type=preSurvey&` +
        `answer0=${preSurveyAnswers[0] || ""}&` +
        `answer1=${preSurveyAnswers[1] || ""}`
    });
  } catch (err) {
    console.error("Error logging final answers:", err);
  }
};

export const fetchUserProgress =  (participantId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_PROGRESS_REQUEST });
    const [resPreSurvey, resImage, resFinal] = await Promise.all([
      fetch(`${SCRIPT_URL}?participantId=${participantId}&type=preSurvey`),
      fetch(`${SCRIPT_URL}?participantId=${participantId}&type=image`),
      fetch(`${SCRIPT_URL}?participantId=${participantId}&type=tool`)
    ]);

    const preSurveyData = await resPreSurvey.json();
    const imageData = await resImage.json();
    const finalData = await resFinal.json();

    const answeredImages = new Set(
      imageData.responses.map((row) => parseInt(row[2], 10)) // row[2] = imageIndex
    );

    const finalCompleted = finalData.responses.length > 0;
    const lastImageIndex = answeredImages.size > 0 ? Math.max(...answeredImages) : 0;
    const preSurveyCompleted = preSurveyData.responses.length > 0;

    dispatch({ 
      type: GET_USER_PROGRESS_SUCCESS,
      payload: { 
        lastImageIndex: lastImageIndex,
        finalCompleted: finalCompleted,
        preSurveyCompleted: preSurveyCompleted,
       } 

    });
  } catch (err) {
    console.error("Error fetching user progress:", err);
    throw err;
  }
};


