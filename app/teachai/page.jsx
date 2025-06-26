// App.js
"use client";

import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress, Box, Typography, Stack, Chip } from "@mui/material";
import useQuestionRecording from "../hooks/useQuestionRecording";
import useAnswerRecording from "../hooks/useAnswerRecording";
import useAudio from "../hooks/useAudio";
import QuestionMedia from "../components/QuestionImage";
import ChapterComponent from "../components/ChapterComponent";
import { ChapterApi } from "../Context/ChapterContext";
import AudioRecorderWave from "../components/AudioRecorderWave";

const App = () => {
  const { successSound, failureSound, questionAudio } = useAudio();
  const {
    detectedQuestionId,
    questionResult,
    loadingQuestion,
    recording: questionRecording,
    handleStartQuestionRecording,
    handleQuestionTextResult,
    handleStopQuestionRecording,
  } = useQuestionRecording();
  const {
    userAnswer,
    answerResult,
    loadingAnswer,
    recording: answerRecording,
    correctAnswer,
    handleStartAnswerRecording,
    handleAnswerTextResult,
    handleStopAnswerRecording,
  } = useAnswerRecording(detectedQuestionId);
  const { chapterDetails, getBackgroundColor } = useContext(ChapterApi);

  const [isAnyRecordingActive, setIsAnyRecordingActive] = useState(false);

  let resultDisplay;

  if (loadingAnswer) {
    resultDisplay = (
      <Typography className="text-lg text-gray-800 flex justify-center items-center gap-4 font-medium">
        <CircularProgress size={30} sx={{ color: "#1a9de6" }} />
        جاري التحقق من الإجابة
      </Typography>
    );
  } else if (userAnswer && !loadingQuestion) {
    resultDisplay = (
      <Stack
        direction={{ xs: "column", sm: "row-reverse" }} 
        spacing={2}
        alignItems={{ xs: "center", sm: "flex-start" }} 
        justifyContent="center"
        className="w-full"
      >
        <Chip
          label={`الإجابة: ${userAnswer}`}
          color="primary"
          sx={{
            fontSize: { xs: 16, sm: 20 }, 
            padding: { xs: 2, sm: 4 },
            minWidth: { xs: '80%', sm: 'auto' }, 
            textAlign: 'center',
            height: 'auto', 
          }}
          className="shadow-md"
        />
        <Chip
          sx={{
            fontSize: { xs: 16, sm: 20 },
            padding: { xs: 2, sm: 4 },
            minWidth: { xs: '80%', sm: 'auto' },
            textAlign: 'center',
            height: 'auto',
          }}
          label={`النتيجة: ${answerResult}`}
          color={answerResult === "صحيحة" ? "success" : "error"}
          className="shadow-md"
        />
        <Chip
          sx={{
            fontSize: { xs: 16, sm: 20 },
            padding: { xs: 2, sm: 4 },
            minWidth: { xs: '80%', sm: 'auto' },
            textAlign: 'center',
            height: 'auto',
          }}
          label={`الإجابة الصحيحة: ${correctAnswer}`}
          color="success"
          className="shadow-md"
        />
      </Stack>
    );
  } else {
    resultDisplay = " ";
  }

  const onQuestionRecordingStarted = () => {
    setIsAnyRecordingActive(true);
    handleStartQuestionRecording();
  };

  const onQuestionTextResult = (text) => {
    handleQuestionTextResult(text, questionAudio);
    setIsAnyRecordingActive(false);
  };

  const onQuestionRecordingStopped = () => {
    handleStopQuestionRecording();
    setIsAnyRecordingActive(false);
  };

  const onAnswerRecordingStarted = () => {
    setIsAnyRecordingActive(true);
    handleStartAnswerRecording();
  };

  const onAnswerTextResult = (text) => {
    handleAnswerTextResult(text, successSound, failureSound);
    setIsAnyRecordingActive(false);
  };

  const onAnswerRecordingStopped = () => {
    handleStopAnswerRecording();
    setIsAnyRecordingActive(false);
  };

  return (
    <Box dir="rtl" className="min-h-screen flex flex-col">
      <Box
        className="flex-grow text-center text-gray-800 flex flex-col items-center justify-start py-4 space-y-4 transition-colors duration-500 p-4 sm:p-6 lg:p-8"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <Typography variant="h4" component="h1" className="m-0 py-2 font-bold text-gray-900 text-3xl sm:text-4xl lg:text-5xl">
          نظام التعرف على الأسئلة
        </Typography>

        <ChapterComponent />

        {chapterDetails && (
          <Typography variant="h6" component="h4" className="text-gray-700 text-lg sm:text-xl">
            الوحدة: {chapterDetails.name}
          </Typography>
        )}

        <Box className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 w-full max-w-4xl px-4">
          <AudioRecorderWave
            onTextResult={onQuestionTextResult}
            onRecordingStarted={onQuestionRecordingStarted}
            onRecordingStopped={onQuestionRecordingStopped}
            disabled={isAnyRecordingActive && !questionRecording} 
            buttonText="تسجيل السؤال"
          />
          <AudioRecorderWave
            onTextResult={onAnswerTextResult}
            onRecordingStarted={onAnswerRecordingStarted}
            onRecordingStopped={onAnswerRecordingStopped}
            disabled={isAnyRecordingActive || !detectedQuestionId || loadingQuestion}
                        buttonText="تسجيل الإجابة"
          />
        </Box>

        <Box className="min-h-[300px] sm:min-h-[400px] flex justify-center items-center w-full max-w-2xl bg-gray-300 rounded-2xl p-2.5 shadow-xl border-4 border-gray-400">
          <QuestionMedia
            key={questionResult.id}
            src={questionResult.src.length > 10 ? questionResult?.src : ""}
            alt={questionResult.question}
            highlighted={detectedQuestionId === questionResult.id}
            className="rounded-xl object-contain max-h-[calc(100%-20px)] max-w-[calc(100%-20px)]"
          />
        </Box>

        {loadingQuestion ? (
          <Typography className="text-lg text-gray-800 flex justify-center items-center gap-4 font-medium"
            sx={{
              fontSize: { xs: 16, sm: 18, md: 20 },
              padding: 2
            }}>
            <CircularProgress size={30} sx={{ color: "#1a9de6" }} />
            ...جاري معالجة السؤال
          </Typography>
        ) : (
          <Typography className="text-lg text-gray-800 font-medium" sx={{
            fontSize: { xs: 18, sm: 20, md: 22 },
            padding: 2
          }}>
            {questionResult.question}
          </Typography>
        )}

        {resultDisplay}
      </Box>

      <audio ref={successSound} src="/assets/Sound/facts.mp3" preload="auto" />
      <audio ref={failureSound} src="/assets/Sound/erorr.mp3" preload="auto" />
      <audio ref={questionAudio} preload="auto" />

      <ToastContainer />
    </Box>
  );
};

export default App;