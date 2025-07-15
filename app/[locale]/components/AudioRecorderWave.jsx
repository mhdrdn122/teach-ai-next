// components/AudioRecorderWave.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import {
  startVoiceRecognition,
  stopVoiceRecognition,
} from "../services/voiceRecognition";
import { useTranslations } from "next-intl";

const AudioRecorderWave = ({
  onTextResult,
  onRecordingStarted,
  onRecordingStopped,
  buttonText,
}) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const recordPluginRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [duration, setDuration] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [text , setText] = useState("")
  const t = useTranslations("teach-ai");

  const createWaveSurfer = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#4fc3f7",
      progressColor: "#0288d1",
      height: 100,
      cursorWidth: 0,
      hideScrollbar: true,
    });

    const record = wavesurfer.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: false,
        scrollingWaveform: false,
        continuousWaveform: true,
        continuousWaveformDuration: 30,
      })
    );

    record.on("record-end", (blob) => {});

    record.on("record-progress", (ms) => {
      setDuration(Math.floor(ms / 1000));
    });

    wavesurferRef.current = wavesurfer;
    recordPluginRef.current = record;
  };

  useEffect(() => {
    createWaveSurfer();
    return () => {
      wavesurferRef.current?.destroy();
      stopVoiceRecognition();
    };
  }, []);

  const startRecording = async () => {
    // setDisabled(true);
    setAudioUrl(null);
    setDuration(0);

    try {
      if (onRecordingStarted) onRecordingStarted();
      setIsRecording(true);

      const devices = await RecordPlugin.getAvailableAudioDevices();
      const defaultDevice = devices[0]?.deviceId;
      await recordPluginRef.current.startRecording({ deviceId: defaultDevice });

      const text = await startVoiceRecognition();
      console.log(text)
      setText(text)
      
      // setIsRecording(false);
      // if (onRecordingStopped) onRecordingStopped();
    } catch (error) {
      console.error("حدث خطأ أثناء بدء التسجيل أو التعرف على الصوت:", error);
      if (recordPluginRef.current?.isRecording()) {
        recordPluginRef.current.stopRecording();
      }
      stopVoiceRecognition();
      setIsRecording(false);
      if (onRecordingStopped) onRecordingStopped();
    }
  };

  const stopRecording = () => {
    setDisabled(false);

    if (recordPluginRef.current?.isRecording()) {
      recordPluginRef.current.stopRecording();
    }
    stopVoiceRecognition();
    setIsRecording(false);
    if (onRecordingStopped) onRecordingStopped();
    if (onTextResult) {
        onTextResult(text);
      }
  };

  const handleStart = (e) => {
    e.preventDefault();
    // if (!disabled)
       startRecording();
  };

  const handleEnd = (e) => {
    e.preventDefault();
    // if (!disabled)
       stopRecording();
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-white rounded-lg shadow-lg w-full max-w-sm mx-auto transition-all duration-300 ease-in-out">
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">
        {buttonText}
      </h3>

      <div className="w-full  h-24 mb-4" ref={waveformRef} />
      <div className="flex gap-3 ">
        <button
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          // disabled={disabled}
          className={`
            px-6 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300
            ${
              disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md hover:shadow-lg"
            }
            flex items-center justify-center gap-2
          `}
        >
          <span className="text-2xl">🎙️</span> {t("record-start")}
        </button>
      </div>

      {isRecording && (
        <p className="mt-4 text-green-600 font-semibold text-md sm:text-lg">
          {t("record-time")} : {duration} {t("second")}
        </p>
      )}

      {/*
      {audioUrl && (
        <div className="mt-4 w-full">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">🔊 الاستماع للتسجيل:</h3>
          <audio controls src={audioUrl} className="w-full"></audio>
        </div>
      )} 
      */}
    </div>
  );
};

export default AudioRecorderWave;
