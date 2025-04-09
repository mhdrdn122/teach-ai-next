"use client";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { recognizeVoice } from "./services/voiceRecognition";
import {
  getQuestionIdFromGemini,
  checkAnswerFromGemini,
} from "./services/geminiService";
import { questions } from "./data/questions";
import QuestionImage from "./components/QuestionImage";
import RecordButton from "./components/RecordButton";
import { speakArabicText } from "./services/speechUtils";
import {
  showSuccessConfetti,
  showFailureConfetti,
} from "./services/confettiUtils";
import { PuffLoader } from "react-spinners";

const App = () => {
  const [detectedQuestionId, setDetectedQuestionId] = useState(null);
  const [disable, setDisable] = useState(" ");
  const [userAnswer, setUserAnswer] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [questionResult, setQuestionResult] = useState({
    id: 0,
    src: "",
    question: "",
    answer: "",
  });

  const [recording, setRecording] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  // console.log(userAnswer)
  // console.log(answerResult)
  // console.log(questionResult)

  const successSound = useRef(null);
  const failureSound = useRef(null);

  const startRecordingQuestion = async () => {
    setRecording(true);
    setQuestionResult({ id: 0, src: "", question: "", answer: "" });
    setUserAnswer("");

    try {
      setLoadingQuestion(true);
      const voiceText = await recognizeVoice();
      const questionId = await getQuestionIdFromGemini(questions, voiceText);
      setDetectedQuestionId(questionId);
      const questionText = questions.filter((q) => q.id == questionId);
      setDisable(questionText[0].answer);
      console.log(questionText[0]);

      setQuestionResult(questionText[0]);

      setLoadingQuestion(false);
      speakArabicText(questionText[0].question);
    } catch (error) {
      console.error("خطأ في التسجيل:", error);
      setLoadingQuestion(false);
    }
    setRecording(false);
  };

  const startRecordingAnswer = async () => {
    setRecording(true);
    setUserAnswer("");
    setLoadingAnswer(true);
    try {
      const answerText = await recognizeVoice();
      const question = questions.find((q) => q.id === detectedQuestionId);
      const isCorrect = await checkAnswerFromGemini(question, answerText);
      setUserAnswer(answerText);
      speakArabicText(answerText);

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
      console.error("خطأ في التسجيل:", error);
    }
    setRecording(false);
  };
  return (
    <>
      <div className={`app-container ${recording ? "recording" : ""}`}>
        <h1>نظام التعرف على الأسئلة</h1>
        <div className="image-gallery" style={{ minHeight: "350px" }}>
          <div className="img">
            <QuestionImage
              key={questionResult.id}
              src={questionResult.src.length > 10 ? questionResult.src : ""}
              alt={questionResult.question}
              highlighted={detectedQuestionId === questionResult.id}
            />
          </div>
        </div>
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
          <p className="status-text"> {questionResult.question} </p>
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

      <audio
        ref={successSound}
        src={"/assets/Sound/facts.mp3"}
        preload="auto"
      />
      <audio
        ref={failureSound}
        src={"/assets/Sound/erorr.mp3"}
        preload="auto"
      />

      <ToastContainer />
    </>
  );
};

export default App;
