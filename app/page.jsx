"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { recognizeVoice } from "./services/voiceRecognition";
import { getQuestionIdFromGemini, checkAnswerFromGemini } from "./services/geminiService";
import { getQuestionIdFromAi } from "./services/AiService";
import { questions } from "./data/questions";
import QuestionImage from "./components/QuestionImage"; ``
import RecordButton from "./components/RecordButton";
import { speakArabicText } from "./services/speechUtils";
import {
  showSuccessConfetti,
  showFailureConfetti,
} from "./services/confettiUtils";
import { PuffLoader } from "react-spinners";

const App = () => {
  // console.log(process.env.NEXT_PUBLIC_TOGETHER_API_KEY);

  const dataSchema = {
    id: 0, src: "", question: "", questionVoice: "", answer: "", chapter: '', lesson: '',
  }

  const [detectedQuestionId, setDetectedQuestionId] = useState(null);
  const [disable, setDisable] = useState(" ");
  const [userAnswer, setUserAnswer] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [questionResult, setQuestionResult] = useState(dataSchema);

  const [recording, setRecording] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const successSound = useRef(null);
  const failureSound = useRef(null);
  const questionAudio = useRef(null);

  const startRecordingQuestion = async () => {
    setRecording(true);
    setQuestionResult(dataSchema);
    setUserAnswer("");
    try {
      setLoadingQuestion(true);
      const voiceText = await recognizeVoice();
      const questionId = await getQuestionIdFromGemini(questions, voiceText);
      // const questionId = await getQuestionIdFromAi(questions, voiceText);
      // console.log(`answer is questionId2  : ${questionId2}`)
      setDetectedQuestionId(questionId);
      const questionText = questions.find((q) => q.id == questionId);

      setDisable(questionText.answer);
      console.log(questionText);

      console.log("before questionText", questionText.question);
      speakArabicText(questionText.question);
      console.log(questionText.answer, "after questionText")

      setQuestionResult(questionText);
      setLoadingQuestion(false);


      if (questionAudio.current && questionText.questionVoice) {
        questionAudio.current.src = questionText.questionVoice;
        questionAudio.current.play();
      }
    } catch (error) {
      console.error("خطأ في التسجيل:", error);
      setLoadingQuestion(false);
    }
    setRecording(false);
  };

  const startRecordingAnswer = async () => {
    setRecording(true);
    setUserAnswer("");
    setAnswerResult(null);
    toast.dismiss();
    setLoadingAnswer(true);
    try {
      const answerText = await recognizeVoice();
      const question = questions.find((q) => q.id === detectedQuestionId);
      const isCorrect = await checkAnswerFromGemini(question, answerText);
      setUserAnswer(answerText);

      //TODO: edited by hsn
      // console.log(questionResult,"speakArabicText")
      // speakArabicText(answerText);

      setAnswerResult(isCorrect);
      setLoadingAnswer(false);
      if (isCorrect === "صحيحة") {
        toast.success("إجابة صحيحة! 🎉");
        if (successSound.current) {
          successSound.current.currentTime = 0;
          successSound.current.play();
        }
        showSuccessConfetti();
      } else {
        toast.error("إجابة خاطئة! 😞");
        if (failureSound.current) {
          failureSound.current.currentTime = 0;
          failureSound.current.play();
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

  return (
    <div >
      <div className={`app-container ${recording ? "recording" : ""}`}>
        <h1>نظام التعرف على الأسئلة</h1>
        <h4>الوحدة : {questionResult.chapter}</h4>
        <h4>الدرس : {questionResult.lesson}</h4>
        {/* <p>{`الوحدة : ${questionResult.chapter}    -    الدرس : ${questionResult.lesson}`}</p> */}
        <div className="button-container">
          <RecordButton
            onMouseDown={startRecordingQuestion}
            onMouseUp={() => setRecording(false)}
            text="🎙️ تسجيل السؤال"
            active={recording}
          />
          <RecordButton
            onMouseDown={startRecordingAnswer}
            onMouseUp={() => setRecording(false)}
            text="🎤 تسجيل الإجابة"
            active={recording}
            disabled={disable}
          />
        </div>
        <div className="image-gallery" style={{
          minHeight: "400x",
          minWidth: "400px"
        }}>
          <div className="img">
            <QuestionImage
              key={questionResult.id}
              src={questionResult.src.length > 10 ? questionResult.src : ""}
              alt={questionResult.question}
              highlighted={detectedQuestionId === questionResult.id}
            />
          </div>
        </div>

        {loadingQuestion ? (
          <p className="status-text">
            <span>
              <PuffLoader
                color="#1a9de6"
                cssOverride={{}}
                loading
                size={30}
                speedMultiplier={3}
              />
            </span>
            ...جاري معالجة السؤال
          </p>
        ) : (
          <p className="status-text">{questionResult.question}</p>
        )}

        {!loadingAnswer ? (
          userAnswer ? (
            <p>
              الإجابة: {userAnswer} - النتيجة:{" "}
              {answerResult == "صحيحة" ? "صحيحة" : "خاطئة"}
            </p>
          ) : (
            " "
          )
        ) : (
          <p className="status-text">
            <span>
              <PuffLoader
                color="#1a9de6"
                cssOverride={{}}
                loading
                size={30}
                speedMultiplier={3}
              />
            </span>
            جاري التحقق من الاجابة
          </p>
        )}
      </div>

      <audio ref={successSound} src={"/assets/Sound/facts.mp3"} preload="auto" />
      <audio ref={failureSound} src={"/assets/Sound/erorr.mp3"} preload="auto" />
      <audio ref={questionAudio} preload="auto" /> {/* مشغل صوت السؤال */}

      <ToastContainer />
    </div>
  );
};

export default App;
