"use client";

import React, { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ChapterApi } from "../Context/ChapterContext";
import useRecording from "../hooks/useRecording";
import useAudioPlayer from "../hooks/useAudioPlayer";
import AudioRecorderWave from "../components/AudioRecorderWave";
import QuestionMedia from "../components/QuestionImage";
import ChapterComponent from "../components/ChapterComponent";
import ResultDisplay from "../components/ResultDisplay";
import FormDialog from "../LandingPage/FormDialog";
import LocaleSwitcher from "../components/LocaleSwitcher";
import {
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
} from "../data/questions_by_chapter";
import TextQuestion from "../components/TextQuestion";

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

const App = () => {
  const { chapterDetails, getBackgroundColor } = useContext(ChapterApi);
  const t = useTranslations("teach-ai");
  const { successSoundRef, failureSoundRef, questionAudioRef } =
    useAudioPlayer();

  const {
    isRecordingActive: isQuestionRecordingActive,
    isLoadingQuestion,
    questionResult,
    startRecording: startQuestionRecording,
    stopRecording: stopQuestionRecording,
    resetAnswerResult
  } = useRecording(
    "question",
    chooseChapter(chapterDetails?.id),
    questionAudioRef
  );

  const {
    isRecordingActive: isAnswerRecordingActive,
    isLoadingAnswer,
    answerResult,
    disableAnswerButton,
    startRecording: startAnswerRecording,
    stopRecording: stopAnswerRecording,
  } = useRecording(
    "answer",
    {
      detectedQuestionId: questionResult?.id, questions: chooseChapter(chapterDetails?.id)
      // ,questionChanged: questionResult?.id 

    },
    null,
    successSoundRef,
    failureSoundRef
  );

 

  return (
    <Box className="min-h-screen flex flex-col">
      <Box
        className="flex-grow text-center text-gray-800 flex flex-col items-center justify-start py-4 space-y-4 p-4 sm:p-6 lg:p-8"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <div className="flex items-center justify-between w-full">
          <FormDialog mode="edit" />
          <LocaleSwitcher />
        </div>

        <Typography
          variant="h4"
          component="h1"
          className="m-0 py-2 font-bold text-gray-900 text-3xl sm:text-4xl lg:text-5xl"
        >
          {`${t("title-part1")} ${localStorage.getItem("userName") || t("dear")
            } ${t("title-part2")}`}
        </Typography>

        <ChapterComponent />

        {chapterDetails && (
          <Typography
            variant="h6"
            component="h4"
            className="text-gray-700 text-lg sm:text-xl"
            sx={{ my: 2 }}
          >
            {t("unit")}: {chapterDetails.name}
          </Typography>
        )}

        <Box className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 w-full max-w-4xl px-4">
          <AudioRecorderWave
            onRecordingStarted={startQuestionRecording}
            onRecordingStopped={stopQuestionRecording}
            buttonText={t("question")}
          disabled={  false}
          />
          <AudioRecorderWave
            onRecordingStarted={startAnswerRecording}
            onRecordingStopped={stopAnswerRecording}
            buttonText={t("answer")}
            disabled={disableAnswerButton}
          />
        </Box>

        <Box className="min-h-[300px] sm:min-h-[400px] flex justify-center items-center w-full max-w-2xl bg-gray-300 rounded-2xl p-2.5 shadow-xl border-4 border-gray-400">
          <QuestionMedia
            key={questionResult?.id}
            src={questionResult?.src || ""}
            alt={questionResult?.question}
            highlighted={questionResult?.id === questionResult?.id}
            className="rounded-xl object-contain max-h-[calc(100%-20px)] max-w-[calc(100%-20px)]"
          />
        </Box>

        {isLoadingQuestion ? (
          <Typography
            className="text-lg text-gray-800 flex justify-center items-center gap-4 font-medium"
            sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, padding: 2 }}
          >
            <CircularProgress size={30} sx={{ color: "#1a9de6" }} />
            {t("loading-question")}
          </Typography>
        ) : 
        

          <TextQuestion text={questionResult?.question} />
        }

        <ResultDisplay
          isLoadingAnswer={isLoadingAnswer}
          isLoadingQuestion={isLoadingQuestion}
          answerResult={answerResult}

        />
      </Box>

      <audio
        ref={successSoundRef}
        src="/assets/Sound/facts.mp3"
        preload="auto"
      />
      <audio
        ref={failureSoundRef}
        src="/assets/Sound/erorr.mp3"
        preload="auto"
      />
      <audio ref={questionAudioRef} preload="auto" />

      {/* <ToastContainer /> */}
    </Box>
  );
};

export default App;
