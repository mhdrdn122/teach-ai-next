import { useContext, useEffect, useState } from "react";
import { recognizeVoice } from "../services/voiceRecognition";
import { getQuestionIdFromGemini } from "../services/geminiService";
import { speakArabicText } from "../services/speechUtils";
import { ChapterApi } from "../Context/ChapterContext";
import {
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
} from "../data/questions_by_chapter";

const chooseChapter = (id) => {
  switch (id) {
    case 1:
      return chapter1;
    case 2:
      return chapter2;
    case 3:
      return chapter3;
    case 4:
      return chapter4;
    case 5:
      return chapter5;
    case 6:
      return chapter6;
    case 7:
      return chapter7;
    default:
      return null;
  }
};

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
  const [data, setData] = useState([]);

  const { chapterDetails } = useContext(ChapterApi);

  useEffect(() => {
    setData(chooseChapter(chapterDetails?.id));
  }, [chapterDetails?.id]);

  console.log(data);
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
      const questionId = await getQuestionIdFromGemini(data, voiceText);
      setDetectedQuestionId(questionId);
      const questionText = data.find((q) => q.id == questionId) || {
          id: 0,
          src: "/assets/images/not.gif",
          question: "هذا السؤال غير موجود في هذا الـ chapter",
          questionVoice: "",
          answer: " ",
          chapter: "",
          lesson: "",
        };
      
      setDisable(questionText?.answer);
      speakArabicText(questionText?.question);
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
