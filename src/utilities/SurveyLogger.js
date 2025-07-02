const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyliDFLaAOWLfjT1w_-V2Z4msmWfsmKkwo6tJjnVVNn_9_9qYVKVx4gU4ZsUjBi5GuL/exec";

// Log answers for a single image
export const logImageAnswers = async ({ participantId, imageIndex, answers }) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participantId,
        imageIndex,
        answers,
        type: "image"
      })
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error logging image answers:", err);
    throw err;
  }
};

// Log final survey answers
export const logToolAnswers = async ({ participantId, answers }) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participantId,
        answers,
        type: "tool"
      })
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error logging final answers:", err);
    throw err;
  }
};

export const fetchUserProgress = async (participantId) => {
  try {
    const [resImage, resFinal] = await Promise.all([
      fetch(`${SCRIPT_URL}?participantId=${participantId}&type=image`),
      fetch(`${SCRIPT_URL}?participantId=${participantId}&type=final`)
    ]);

    const imageData = await resImage.json();
    const finalData = await resFinal.json();

    const answeredImages = new Set(
      imageData.responses.map(row => parseInt(row[2], 10)) // row[2] = imageIndex
    );

    const finalCompleted = finalData.responses.length > 0;

    return {
      lastImageIndex: answeredImages.size > 0 ? Math.max(...answeredImages) + 1 : 0,
      finalCompleted
    };
  } catch (err) {
    console.error("Error fetching user progress:", err);
    throw err;
  }
};