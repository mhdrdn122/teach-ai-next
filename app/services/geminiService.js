import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || "AIzaSyDx55LPyLCaKNrdfBwC-QmJCVpMQDvMu0Y");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Sends a list of predefined questions along with the user's spoken text to Gemini.
 * Gemini returns only the ID of the matching question.
 */
export const getQuestionIdFromGemini = async (questions, voiceText) => {
  const prompt = `
أنت خبير في تحليل النصوص العربية ومطابقتها بدقة. لديك قائمة من الأسئلة المرقمة من 1 إلى ${questions.length} كما يلي:

${questions.map(q => `${q.id}- ${q.question}`).join("\n")}

المستخدم قال الجملة التالية بصوته: "${voiceText}"

مهمتك هي تحديد رقم السؤال الذي يطابق جملة المستخدم بدقة عالية. اتبع هذه التعليمات بدقة:
1. قارن جملة المستخدم مع كل سؤال في القائمة، مع التركيز على المعنى الأساسي والكلمات الرئيسية.
2. تجاهل الاختلافات البسيطة في الصياغة (مثل إضافة كلمات مثل "ما" أو "كيف" أو اختلاف ترتيب الكلمات) طالما أن المعنى مطابق.
3. إذا كانت جملة المستخدم تحتوي على أخطاء طفيفة (مثل أخطاء نطق أو تحويل صوتي)، حاول استنتاج السؤال الصحيح بناءً على التشابه.
4. إذا لم يتطابق أي سؤال مع جملة المستخدم، أعد الرقم 35.
5. أعد **رقم السؤال فقط** (مثل "47") بدون أي نص إضافي أو علامات ترقيم.

مثال:
- إذا قال المستخدم: "ما هو اسمك؟" والسؤال في القائمة هو "ما اسمك؟"، أعد الرقم المقابل (مثل "1").
- إذا قال المستخدم: "شو اسمك؟"، استنتج أن المعنى مشابه لـ "ما اسمك؟" وأعد نفس الرقم.
- إذا قال المستخدم: "ما هي عاصمة فرنسا؟" ولا يوجد تطابق، أعد "35".
ايضا هناك فرق بين السؤال مثلا 2 و 2 = 4
و السؤال 
2 + 2 = 4 
فأول يشرح مكونات العدد اربعة و ثاني يشرح عملية الجمع 
لا تخطأ في مثل هذه الاسئلة 
`;

  try {
    const result = await model.generateContent(prompt);
    const answer = result.response.text().trim();
    const questionId = parseInt(answer, 10);
    return isNaN(questionId) ? 35 : questionId; // Return 35 if parsing fails
  } catch (error) {
    console.error("خطأ في استدعاء Gemini:", error);
    return 35; // Return 35 on error
  }
};

/**
 * Sends the detected question and the user's answer to check if the answer is correct.
 */
export const checkAnswerFromGemini = async (question, answerText) => {
  const prompt = `
أنت خبير في تقييم الإجابات باللغة العربية بدقة عالية. لديك السؤال التالي: "${question.question}"
والإجابة الصحيحة هي: "${question.answer}"

المستخدم قدم الإجابة التالية: "${answerText}"

مهمتك هي تحديد ما إذا كانت إجابة المستخدم صحيحة أم خاطئة. اتبع هذه التعليمات بدقة:
1. قارن إجابة المستخدم مع الإجابة الصحيحة، مع مراعاة المعنى والسياق.
2. إذا كانت الإجابة الصحيحة رقمًا (مثل "2")، اقبل الإجابة كنص (مثل "اثنان" أو "الثاني" أو "رقم اثنين") أو كرقم ("2") طالما أنها تعبر عن نفس القيمة.
3. تجاهل الاختلافات البسيطة في الصياغة (مثل إضافة كلمات مثل "الجواب" أو اختلاف ترتيب الكلمات) إذا كان المعنى مطابقًا.
4. إذا كانت إجابة المستخدم تحتوي على أخطاء طفيفة (مثل أخطاء نطق أو تحويل صوتي)، حاول استنتاج المعنى بناءً على التشابه.
5. إذا كانت الإجابة الصحيحة نصًا طويلًا، تحقق مما إذا كانت إجابة المستخدم تحتوي على الكلمات الرئيسية أو المعنى الأساسي.
6. أعد **كلمة واحدة فقط**: "صحيحة" إذا كانت الإجابة صحيحة، أو "خاطئة" إذا كانت خاطئة.

أمثلة:
- السؤال: "كم عدد الكواكب في المجموعة الشمسية؟"، الإجابة الصحيحة: "8"، إجابة المستخدم: "ثمانية" → أعد "صحيحة".
- السؤال: "ما هي عاصمة فرنسا؟"، الإجابة الصحيحة: "باريس"، إجابة المستخدم: "مدينة باريس" → أعد "صحيحة".
- السؤال: "ما هو 2 + 2؟"، الإجابة الصحيحة: "4"، إجابة المستخدم: "خمسة" → أعد "خاطئة".
`;

  try {
    const result = await model.generateContent(prompt);
    const reply = result.response.text().trim();
    return reply === "صحيحة" ? "صحيحة" : "خاطئة"; // Ensure only "صحيحة" or "خاطئة" is returned
  } catch (error) {
    console.error("خطأ في استدعاء Gemini للتحقق من الإجابة:", error);
    return "خاطئة"; // Default to "خاطئة" on error
  }
};