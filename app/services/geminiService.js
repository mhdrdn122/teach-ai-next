import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.REACT_APP_GEMINI_API_KEY ||
    "AIzaSyDx55LPyLCaKNrdfBwC-QmJCVpMQDvMu0Y"
);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Identifies the question ID from a list of questions based on the user's spoken text.
 * @param {Array} questions - List of question objects with id and question properties.
 * @param {string} voiceText - The user's spoken text in Arabic.
 * @returns {number} The ID of the matching question or 35 if no match is found.
 */
export const getQuestionIdFromGemini = async (questions, voiceText) => {
  const prompt = `
You are an expert in Arabic text analysis and matching. You are provided with a list of numbered questions from 1 to ${
    questions.length
  } as follows:

${questions.map((q) => `${q.id}- ${q.question}`).join("\n")}

The user has spoken the following sentence in Arabic: "${voiceText}"

Your task is to identify the ID of the question that matches the user's spoken sentence with high accuracy. Follow these instructions strictly:
1. Compare the user's sentence with each question in the list, focusing on the core meaning and key words.
2. Ignore minor phrasing differences (e.g., additional words like "ما" or "كيف", or variations in word order) as long as the meaning is equivalent.
3. Account for potential speech-to-text errors (e.g., mispronunciations or transcription inaccuracies) by inferring the intended question based on semantic similarity.
4. Handle linguistic variations, such as Arabic dialects or informal phrasing, by focusing on the closest semantic match.
5. For questions with similar phrasing but distinct meanings (e.g., "2 and 2 is 4" explaining the components of the number 4, vs. "2 + 2 = 4" explaining the addition operation), ensure precise differentiation based on context and intent.
6. If no question matches the user's sentence, return the number 35.
7. Return **only the question ID** (e.g., "47") as a plain number, without additional text, punctuation, or spaces.
8. If the input is ambiguous or unclear, prioritize the most likely match based on semantic similarity, or return 35 if no reasonable match is found.

Examples:
- User says: "ما هو اسمك؟", Question in list: "ما اسمك؟" → Return "1".
- User says: "شو اسمك؟" → Infer it matches "ما اسمك؟" and return "1".
- User says: "ما هي عاصمة فرنسا؟", No match in list → Return "35".
- User says: "إثنان وإثنان يساوي أربعة" → Differentiate from "إثنان زائد إثنان يساوي أربعة" and return the correct ID based on context.
`;

  try {
    const result = await model.generateContent(prompt);
    const answer = result.response.text().trim();
    const questionId = parseInt(answer, 10);
    return isNaN(questionId) ? 35 : questionId;
  } catch (error) {
    console.error("Error calling Gemini for question ID:", error);
    return 35;
  }
};

/**
 * Checks if the user's answer is correct for a given question.
 * @param {Object} question - The question object with question and answer properties.
 * @param {string} answerText - The user's answer text in Arabic.
 * @returns {string} "صحيحة" if the answer is correct, "خاطئة" otherwise.
 */
export const checkAnswerFromGemini = async (question, answerText) => {
  //   const prompt = `

  // You are an expert in evaluating Arabic answers with high accuracy. You are provided with the following question: "${question.question}"
  // The correct answer is: "${question.answer}"

  // The user provided the following answer: "${answerText}"

  // Your task is to determine whether the user's answer is correct or incorrect. Follow these instructions strictly:
  // 1. Compare the user's answer with the correct answer, considering meaning and context.
  // 2. If the correct answer is a number (e.g., "2"), accept the answer as text (e.g., "اثنان", "الثاني", "رقم اثنين") or as a number ("2") as long as it represents the same value.
  // 3. Ignore minor phrasing differences (e.g., additional words like "الجواب" or variations in word order) if the meaning is equivalent.
  // 4. Account for potential speech-to-text errors (e.g., mispronunciations or transcription inaccuracies) by inferring the intended meaning based on semantic similarity.
  // 5. Handle linguistic variations, such as Arabic dialects or informal phrasing, by focusing on the closest semantic match.
  // 6. If the correct answer is a long text, check if the user's answer contains the key words or core meaning.
  // 7. Return **exactly one word**: "صحيحة" if the answer is correct, or "خاطئة" if incorrect.
  // 8. If the input is ambiguous or unclear, prioritize the most likely match based on semantic similarity, or return "خاطئة" if no reasonable match is found.

  // Examples:
  // - Question: "كم عدد الكواكب في المجموعة الشمسية؟", Correct answer: "8", User answer: "ثمانية" → Return "صحيحة".
  // - Question: "ما هي عاصمة فرنسا؟", Correct answer: "باريس", User answer: "مدينة باريس" → Return "صحيحة".
  // - Question: "ما هو 2 + 2؟", Correct answer: "4", User answer: "خمسة" → Return "خاطئة".
  // `;

  //! edited by hsn
  const prompt = `
You are an expert in evaluating Arabic answers with high accuracy. You are provided with the following question: "${question.question}"
The correct answer is: "${question.answer}"

The user provided the following answer: "${answerText}"

Your task is to determine whether the user's answer is correct or incorrect. Follow these instructions strictly:
1. Compare the user's answer with the correct answer, considering meaning and context.
2. If the correct answer is a number (e.g., "2"), accept the answer as text (e.g., "اثنان", "الثاني", "رقم اثنين") or as a number ("2") as long as it represents the same value.
3. Also, if the user's answer refers to the correct number in a conceptual way (e.g., the answer is "اثنان" and the user answer is "كرتان" or "شيئان"), accept it as correct if it clearly indicates the same quantity.
4. Ignore minor phrasing differences (e.g., additional words like "الجواب" or variations in word order) if the meaning is equivalent.
5. Account for potential speech-to-text errors (e.g., mispronunciations or transcription inaccuracies) by inferring the intended meaning based on semantic similarity.
6. Handle linguistic variations, such as Arabic dialects or informal phrasing, by focusing on the closest semantic match.
7. If the correct answer is a long text, check if the user's answer contains the key words or core meaning.
8. Return **exactly one word**: "صحيحة" if the answer is correct, or "خاطئة" if incorrect.
9. If the input is ambiguous or unclear, prioritize the most likely match based on semantic similarity, or return "خاطئة" if no reasonable match is found.
10. if the the user said the 

Examples:
- Question: "كم عدد الكواكب في المجموعة الشمسية؟", Correct answer: "8", User answer: "ثمانية" → Return "صحيحة".
- Question: "كم عدد الكواكب في المجموعة الشمسية؟", Correct answer: "8", User answer: "ثمانية كواكب" → Return "صحيحة".
- Question: "كم عدد التفاحات؟", Correct answer: "2", User answer: "تفاحتان" → Return "صحيحة".
- Question: "ما هي عاصمة فرنسا؟", Correct answer: "باريس", User answer: "مدينة باريس" → Return "صحيحة".
- Question: "ما هو 2 + 2؟", Correct answer: "4", User answer: "خمسة" → Return "خاطئة".
`;

  try {
    const result = await model.generateContent(prompt);
    const reply = result.response.text().trim();
    return reply === "صحيحة" ? "صحيحة" : "خاطئة";
  } catch (error) {
    console.error("Error calling Gemini for answer verification:", error);
    return "خاطئة";
  }
};
