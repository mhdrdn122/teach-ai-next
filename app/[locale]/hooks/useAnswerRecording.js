// hooks/useAnswerRecording.js
import { useState, useCallback } from "react";
import { toast } from "react-toastify";
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

  const handleStartAnswerRecording = useCallback(() => {
    setRecording(true);
    setUserAnswer("");
    setCorrectAnswer("");
    setAnswerResult(null);
    setLoadingAnswer(true);
  }, []);

  const handleAnswerTextResult = useCallback(async (answerText, successSoundRef, failureSoundRef) => {
    console.log("النص المحول للإجابة:", answerText);
    try {
      const question = questions.find((q) => q.id === detectedQuestionId);
      if (!question) {
        toast.error("لم يتم العثور على السؤال المحدد.");
        setLoadingAnswer(false);
        setRecording(false);
        return;
      }
      const realCorrectAnswer = question.answer;
      setCorrectAnswer(realCorrectAnswer);
      const isCorrect = await checkAnswerFromGemini(question, answerText);
      console.log(isCorrect);
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
      console.error("خطأ في معالجة النص المحول للإجابة:", error);
    }
    setRecording(false);
  }, [detectedQuestionId]);

  
  const handleStopAnswerRecording = useCallback(() => {
    setRecording(false);
  }, []);

  return {
    userAnswer,
    answerResult,
    loadingAnswer,
    recording,
    correctAnswer,
    handleStartAnswerRecording,
    handleAnswerTextResult,     
    handleStopAnswerRecording,  
  };
};

export default useAnswerRecording;