import { GET_USER_PROGRESS_REQUEST, GET_USER_PROGRESS_SUCCESS } from "../Redux/UserProgress/ActionType";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxP8835QNgp8X14DXcaRpPV3p4-fPjJxacc3Moe6I5EBczKikFFbN35PVFtRlydVoZ1/exec";

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

export const fetchUserProgress =  (participantId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_PROGRESS_REQUEST });
    const [resImage, resFinal] = await Promise.all([
      fetch(`${SCRIPT_URL}?participantId=${participantId}&type=image`),
      fetch(`${SCRIPT_URL}?participantId=${participantId}&type=tool`)
    ]);

    const imageData = await resImage.json();
    const finalData = await resFinal.json();

    const answeredImages = new Set(
      imageData.responses.map((row) => parseInt(row[2], 10)) // row[2] = imageIndex
    );

    const finalCompleted = finalData.responses.length > 0;
    const lastImageIndex = answeredImages.size > 0 ? Math.max(...answeredImages) : 0;

    dispatch({ 
      type: GET_USER_PROGRESS_SUCCESS,
      payload: { 
        lastImageIndex: lastImageIndex,
        finalCompleted: finalCompleted
       } 

    });
  } catch (err) {
    console.error("Error fetching user progress:", err);
    throw err;
  }
};
