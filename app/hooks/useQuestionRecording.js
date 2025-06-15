import { useState } from "react";
import { recognizeVoice } from "../services/voiceRecognition";
import { getQuestionIdFromGemini } from "../services/geminiService";
import { questions } from "../data/questions";
import { speakArabicText } from "../services/speechUtils";

const useQuestionRecording = () => {
  const dataSchema = {
    id: 0,
    src: "",
    question: "",
    questionVoice: "",
    answer: "",
    chapter: "",
    lesson: "",
  };

  const [detectedQuestionId, setDetectedQuestionId] = useState(null);
  const [questionResult, setQuestionResult] = useState(dataSchema);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [recording, setRecording] = useState(false);
  const [disable, setDisable] = useState(" ");

  const startRecordingQuestion = async (questionAudioRef) => {
    setRecording(true);
    setQuestionResult(dataSchema);
    setLoadingQuestion(true);
    try {
      const voiceText = await recognizeVoice();
      const questionId = await getQuestionIdFromGemini(questions, voiceText);
      setDetectedQuestionId(questionId);
      const questionText = questions.find((q) => q.id == questionId);

      setDisable(questionText.answer);
      speakArabicText(questionText.question);
      setQuestionResult(questionText);
      setLoadingQuestion(false);

      if (questionAudioRef.current && questionText.questionVoice) {
        questionAudioRef.current.src = questionText.questionVoice;
        questionAudioRef.current.play();
      }
    } catch (error) {
      console.error("خطأ في التسجيل:", error);
      setLoadingQuestion(false);
    }
    setRecording(false);
  };

  return {
    detectedQuestionId,
    questionResult,
    loadingQuestion,
    recording,
    disable,
    startRecordingQuestion,
  };
};

export default useQuestionRecording;