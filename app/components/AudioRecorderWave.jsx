// components/AudioRecorderWave.js
'use client';

import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import { startVoiceRecognition, stopVoiceRecognition } from '../services/voiceRecognition';

const AudioRecorderWave = ({ onTextResult, onRecordingStarted, onRecordingStopped, disabled, buttonText }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const recordPluginRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null); 
  const [duration, setDuration] = useState(0);

  const createWaveSurfer = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#4fc3f7',
      progressColor: '#0288d1',
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

    record.on('record-end', (blob) => {
    });

    record.on('record-progress', (ms) => {
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
    if (disabled) return;

    setAudioUrl(null);
    setDuration(0);

    try {
      if (onRecordingStarted) onRecordingStarted(); 
      setIsRecording(true);

      const devices = await RecordPlugin.getAvailableAudioDevices();
      const defaultDevice = devices[0]?.deviceId;
      await recordPluginRef.current.startRecording({ deviceId: defaultDevice });

      const text = await startVoiceRecognition();
      if (onTextResult) {
        onTextResult(text);
      }
      setIsRecording(false);
      if (onRecordingStopped) onRecordingStopped(); 

    } catch (error) {
      console.error('حدث خطأ أثناء بدء التسجيل أو التعرف على الصوت:', error);
      if (recordPluginRef.current?.isRecording()) {
        recordPluginRef.current.stopRecording();
      }
      stopVoiceRecognition();
      setIsRecording(false);
      if (onRecordingStopped) onRecordingStopped();
    }
  };

  const stopRecording = () => {
    if (recordPluginRef.current?.isRecording()) {
      recordPluginRef.current.stopRecording();
    }
    stopVoiceRecognition();
    setIsRecording(false);
    if (onRecordingStopped) onRecordingStopped();
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-white rounded-lg shadow-lg w-full max-w-sm mx-auto transition-all duration-300 ease-in-out">
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">{buttonText}</h3>

      <div className="w-full h-24 mb-4" ref={waveformRef} />

      {!isRecording ? (
        <button
          onClick={startRecording}
          disabled={disabled}
          className={`
            px-6 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300
            ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md hover:shadow-lg'}
            flex items-center justify-center gap-2
          `}
        >
          <span className="text-2xl">🎙️</span> بدء التسجيل
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="
            px-6 py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800
            shadow-md hover:shadow-lg transition-all duration-300
            flex items-center justify-center gap-2
          "
        >
          <span className="text-2xl">⏹️</span> إيقاف التسجيل
        </button>
      )}

      {isRecording && (
        <p className="mt-4 text-green-600 font-semibold text-md sm:text-lg">مدة التسجيل: {duration} ثانية</p>
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