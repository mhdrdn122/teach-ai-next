import Together from "together-ai";

const apiKey = process.env.NEXT_PUBLIC_TOGETHER_API_KEY;

const together = new Together({ apiKey: apiKey }); // auth defaults to process.env.TOGETHER_API_KEY

// const response = await together.chat.completions.create({
//     messages: [
//         { role: "user", content: "What are some fun things to do in New York?" },
//     ],
//     model: "Qwen/Qwen3-235B-A22B-fp8-tput",
// });

// console.log(response.choices[0].message.content);

export const getQuestionIdFromAi = async (questions, voiceText) => {
  const prompt = `لديك قائمة من الأسئلة مرقمة من 1 إلى ${
    questions.length
  } كما يلي:

${questions.map((q) => q.id + "- " + q.question).join("\n")}

قال المستخدم العبارة التالية:

"${voiceText}"

استنادًا إلى القائمة أعلاه، حدد فقط رقم السؤال الذي يطابق ما قاله المستخدم.
إذا لم يكن هناك سؤال مطابق في القائمة، أعد الرقم 35.

يجب أن يكون ردك هو رقم السؤال فقط، دون أي نص أو شرح إضافي.`;
  try {
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "Qwen/Qwen3-235B-A22B-fp8-tput",
    });

    const answer = response.choices[0].message.content;
    console.log(`response is  : ${response} /n`, response);
    console.log(`answer is  : ${answer} /n`);
    const id = answer.match(/^\s*(\d+)\s*$/m)[1];
    const questionId = parseInt(id);
    return isNaN(questionId) ? null : questionId;
  } catch (error) {
    console.error(error);
    return;
  }
};
