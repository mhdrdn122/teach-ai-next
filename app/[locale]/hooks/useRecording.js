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
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  const [questionResult, setQuestionResult] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);

  const [disableAnswerButton, setDisableAnswerButton] = useState(true);

  const stopRecording = useCallback(() => {
    setIsRecordingActive(false);
    stopVoiceRecognition();
  }, []);

  const startRecording = useCallback(async () => {
    setIsRecordingActive(true);
    setAnswerResult(null); // Clear previous answer result when a new recording starts

    try {
      if (type === "question") {
        setQuestionResult(null); // Clear previous question result
        setIsLoadingQuestion(true);
        setDisableAnswerButton(true); // Disable answer button until a question is detected

        const text = await startVoiceRecognition();
        let detectedQuestion = null;
        if (text) {
          const questionId = await getQuestionIdFromGemini(data, text);
          detectedQuestion = data.find((q) => q.id === questionId);
        }

        if (!detectedQuestion) {
          detectedQuestion = {
            id: 0,
            src: "/assets/images/not.gif",
            question: "هذا السؤال غير موجود",
            answer: "",
          };
          toast.error("لم يتم العثور على السؤال.");
        }

        setQuestionResult(detectedQuestion);
        speakArabicText(detectedQuestion.question);

        if (questionAudioRef.current && detectedQuestion.questionVoice) {
          questionAudioRef.current.src = detectedQuestion.questionVoice;
          questionAudioRef.current.play();
        }

        setDisableAnswerButton(!detectedQuestion.answer);

      } else if (type === "answer") {
        setIsLoadingAnswer(true);
        const question = data.questions.find(
          (q) => q.id === data.detectedQuestionId
        );
        setDisable(question && !question.answer);


        if (!question) {
          handleError(
            new Error("Question not found"),
            "لم يتم العثور على السؤال."
          );
          return;
        }

        const text = await startVoiceRecognition();
        const isCorrect = await checkAnswerFromGemini(question, text);
        setAnswerResult({
          userAnswer: text || " ",
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
      setIsRecordingActive(false);
      setIsLoadingQuestion(false);
      setIsLoadingAnswer(false);
      setDisableAnswerButton(true);
      stopVoiceRecognition();
    } finally {
      setIsRecordingActive(false);
      setIsLoadingQuestion(false);
      setIsLoadingAnswer(false);
    }
  }, [type, data, questionAudioRef, successSoundRef, failureSoundRef]);

  useEffect(() => {
    if (type === "answer" && data && data.detectedQuestionId && data.questions) {
      const question = data.questions.find(q => q.id === data.detectedQuestionId);
      setDisableAnswerButton(!question?.answer);
    } else if (type === "question") {
      setDisableAnswerButton(true);
    }
  }, [type, data]);

  return {
    isRecordingActive,
    isLoadingAnswer,
    isLoadingQuestion,
    answerResult,
    questionResult,
    disableAnswerButton,
    startRecording,
    stopRecording,
  };
};

export default useRecording;
