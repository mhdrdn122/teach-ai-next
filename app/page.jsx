"use client";

import React, { useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress, Box, Typography } from "@mui/material";
import useQuestionRecording from "./hooks/useQuestionRecording";
import useAnswerRecording from "./hooks/useAnswerRecording";
import useAudio from "./hooks/useAudio";
import RecordButton from "./components/RecordButton";
import QuestionMedia from "./components/QuestionImage";
import ChapterComponent from "./components/ChapterComponent";
import { ChapterApi } from "./Context/ChapterContext";

const App = () => {
  const { successSound, failureSound, questionAudio } = useAudio();
  const {
    detectedQuestionId,
    questionResult,
    loadingQuestion,
    recording: questionRecording,
    disable,
    startRecordingQuestion,
  } = useQuestionRecording();
  const {
    userAnswer,
    answerResult,
    loadingAnswer,
    recording: answerRecording,
    startRecordingAnswer,
  } = useAnswerRecording(detectedQuestionId);
  const { chapterDetails, getBackgroundColor } = useContext(ChapterApi);

  const recording = questionRecording || answerRecording;

  return (
    <Box>
      <Box
        className="text-center text-gray-800 min-h-screen flex flex-col items-center justify-start py-4 space-y-4 transition-colors duration-500"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <Typography variant="h4" component="h1" className="m-0 py-2 font-bold text-gray-900">
          نظام التعرف على الأسئلة
        </Typography>

        <ChapterComponent />

        {chapterDetails && (
          <Typography variant="h6" component="h4" className="text-gray-700">
            الوحدة: {chapterDetails.name}
          </Typography>
        )}

        <Box className="flex justify-center gap-4 mb-4 flex-wrap">
          <RecordButton
            onMouseDown={() => startRecordingQuestion(questionAudio)}
            onMouseUp={() => {}}
            text="🎙️ تسجيل السؤال"
            active={recording}
          />
          <RecordButton
            onMouseDown={() => startRecordingAnswer(successSound, failureSound)}
            onMouseUp={() => {}}
            text="🎤 تسجيل الإجابة"
            active={recording}
            disabled={disable}
          />
        </Box>

        <Box className="min-h-[400px] min-w-[400px] flex justify-center items-center w-full max-w-2xl">
          <Box className="bg-gray-300 w-full min-h-[300px] rounded-2xl p-2.5 flex items-center justify-center">
            <QuestionMedia
              key={questionResult.id}
              src={questionResult.src.length > 10 ? questionResult.src : ""}
              alt={questionResult.question}
              highlighted={detectedQuestionId === questionResult.id}
            />
          </Box>
        </Box>

        {loadingQuestion ? (
          <Typography className="text-lg text-gray-800 flex justify-center items-center gap-4 font-medium">
            <CircularProgress size={30} sx={{ color: "#1a9de6" }} />
            ...جاري معالجة السؤال
          </Typography>
        ) : (
          <Typography className="text-lg text-gray-800 font-medium">
            {questionResult.question}
          </Typography>
        )}

        {!loadingAnswer ? (
          userAnswer ? (
            <Typography className="font-medium">
              الإجابة: {userAnswer} - النتيجة: {answerResult === "صحيحة" ? "صحيحة" : "خاطئة"}
            </Typography>
          ) : (
            " "
          )
        ) : (
          <Typography className="text-lg text-gray-800 flex justify-center items-center gap-4 font-medium">
            <CircularProgress size={30} sx={{ color: "#1a9de6" }} />
            جاري التحقق من الإجابة
          </Typography>
        )}
      </Box>

      <audio ref={successSound} src="/assets/Sound/facts.mp3" preload="auto" />
      <audio ref={failureSound} src="/assets/Sound/erorr.mp3" preload="auto" />
      <audio ref={questionAudio} preload="auto" />

      <ToastContainer />
    </Box>
  );
};

export default App;