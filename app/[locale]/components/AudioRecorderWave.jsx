"use client";

import React from "react";
import { useTranslations } from "next-intl";
import useWaveSurfer from "../hooks/useWaveSurfer";

const AudioRecorderWave = ({ onRecordingStarted, onRecordingStopped, buttonText, disabled }) => {
  const { waveformRef, duration, startWaveRecording, stopWaveRecording } = useWaveSurfer();
  const t = useTranslations("teach-ai");

  const handleStart = (e) => {
    e.preventDefault();
    onRecordingStarted();
    startWaveRecording();
  };

  const handleEnd = (e) => {
    e.preventDefault();
    stopWaveRecording();
    onRecordingStopped();
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-white rounded-lg shadow-lg w-full max-w-sm mx-auto">
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">{buttonText}</h3>
      <div className="w-full h-24 mb-4" ref={waveformRef} />
      <div className="flex gap-3">
        <button
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          disabled={disabled}
          className={`
            px-6 py-3 rounded-full text-white font-semibold text-lg
            ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"}
          `}
        >
          <span className="text-2xl">🎙️</span> {t("record-start")}
        </button>
      </div>
      <p className="mt-4 text-green-600 font-semibold text-md sm:text-lg">
        {t("record-time")} : {duration} {t("second")}
      </p>
    </div>
  );
};

export default AudioRecorderWave;