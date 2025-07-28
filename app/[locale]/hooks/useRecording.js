import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import {
  startVoiceRecognition,
  stopVoiceRecognition,
} from "../services/voiceRecognition";
import {
  getQuestionIdFromGemini,
  checkAnswerFromGemini,
} from "../services/geminiService";
import { speakArabicText } from "../services/speechUtils";
import {
  showSuccessConfetti,
  showFailureConfetti,
} from "../services/confettiUtils";
import handleError from "../services/errorHandler";

const useRecording = (
  type,
  data,
  questionAudioRef,
  successSoundRef,
  failureSoundRef
) => {
  const [recording, setRecording] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const [resultQuestion, setResultQuestion] = useState(null);
  const [resultAnswer, setResultAnswer] = useState(null);

  const [disable, setDisable] = useState(true);

  const startRecording = useCallback(async () => {
    setRecording(true);
      setResultAnswer(null);
    setResultQuestion(null);

setLoadingAnswer(true)
    setLoadingQuestion(true);

    try {
      const text = await startVoiceRecognition();
      if (type === "question") {

        const questionId = await getQuestionIdFromGemini(data, text);
        const question = data.find((q) => q.id === questionId) || {
          id: 0,
          src: "/assets/images/not.gif",
          question: "هذا السؤال غير موجود",
          answer: "",
        };
        setResultQuestion(question);
        setDisable(!question.answer);
        speakArabicText(question.question);
        if (questionAudioRef.current && question.questionVoice) {
          questionAudioRef.current.src = question.questionVoice;
          questionAudioRef.current.play();
        }
      } else if (type === "answer") {
  
        const question = data.questions.find(
          (q) => q.id === data.detectedQuestionId
        );
        if (!question) {
          handleError(
            new Error("Question not found"),
            "لم يتم العثور على السؤال."
          );
          return;
        }
        const isCorrect = await checkAnswerFromGemini(question, text);
        setResultAnswer({
          userAnswer: text,
          isCorrect,
          correctAnswer: question.answer,
        });
        if (isCorrect === "صحيحة") {
          toast.success("إجابة صحيحة! 🎉");
          successSoundRef.current?.play();
          showSuccessConfetti();
        } else {
          toast.error("إجابة خاطئة! 😞");
          failureSoundRef.current?.play();
          showFailureConfetti();
        }
      }
    } catch (error) {
      handleError(error, "خطأ في التعرف على الصوت.");
    } finally {
      setRecording(false);
      setLoadingAnswer(false);
      setLoadingQuestion(false);

    }
  }, [type, data, questionAudioRef, successSoundRef, failureSoundRef]);

  const stopRecording = useCallback(() => {
    setRecording(false);
    stopVoiceRecognition();
  }, []);

  useEffect(() => {
    setResultAnswer(null);
  }, [loadingQuestion]);

  return {
    recording,
    loadingAnswer,
    loadingQuestion,
    resultAnswer,
    resultQuestion,
    disable,
    startRecording,
    stopRecording,
  };
};

export default useRecording;
