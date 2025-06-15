import { useState } from "react";
import { toast } from "react-toastify";
import { recognizeVoice } from "../services/voiceRecognition";
import { checkAnswerFromGemini } from "../services/geminiService";
import { questions } from "../data/questions";
import {
  showSuccessConfetti,
  showFailureConfetti,
} from "../services/confettiUtils";

const useAnswerRecording = (detectedQuestionId) => {
  const [userAnswer, setUserAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [recording, setRecording] = useState(false);

  const startRecordingAnswer = async (successSoundRef, failureSoundRef) => {
    setRecording(true);
    setUserAnswer("");
    setCorrectAnswer("");
    setAnswerResult(null);
    setLoadingAnswer(true);

    try {
      const answerText = await recognizeVoice();
      const question = questions.find((q) => q.id === detectedQuestionId);
      const realCorrectAnswer = questions.find(
        (q) => q.id === detectedQuestionId
      ).answer;
      setCorrectAnswer(realCorrectAnswer);
      const isCorrect = await checkAnswerFromGemini(question, answerText);
      setUserAnswer(answerText);
      setAnswerResult(isCorrect);
      setLoadingAnswer(false);

      if (isCorrect === "صحيحة") {
        toast.success("إجابة صحيحة! 🎉");
        if (successSoundRef.current) {
          successSoundRef.current.currentTime = 0;
          successSoundRef.current.play();
        }
        showSuccessConfetti();
      } else {
        toast.error("إجابة خاطئة! 😞");
        if (failureSoundRef.current) {
          failureSoundRef.current.currentTime = 0;
          failureSoundRef.current.play();
        }
        showFailureConfetti();
      }
    } catch (error) {
      setLoadingAnswer(false);
      toast.error("لم يتم التعرف على الصوت، حاول مرة أخرى 🎧");
      console.error("خطأ في التسجيل:", error);
    }
    setRecording(false);
  };

  return {
    userAnswer,
    answerResult,
    loadingAnswer,
    recording,
    correctAnswer,
    startRecordingAnswer,
  };
};

export default useAnswerRecording;
