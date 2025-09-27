import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import handleError from "../services/errorHandler";

const useWaveSurfer = () => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const recordPluginRef = useRef(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#4fc3f7",
      progressColor: "#0288d1",
      height: 100,
      cursorWidth: 0,
      hideScrollbar: true,
    });

    recordPluginRef.current = wavesurferRef.current.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: false,
        scrollingWaveform: false,
        continuousWaveform: true,
        continuousWaveformDuration: 30,
      })
    );

    recordPluginRef.current.on("record-progress", (ms) => {
      setDuration(Math.floor(ms / 1000));
    });

    return () => wavesurferRef.current?.destroy();
  }, []);

  const startWaveRecording = async () => {
    try {
      const devices = await RecordPlugin.getAvailableAudioDevices();
      const defaultDevice = devices[0]?.deviceId;
      await recordPluginRef.current.startRecording({ deviceId: defaultDevice });
    } catch (error) {
        toast.error(error);
      
      // handleError(error, "خطأ في بدء التسجيل.");
    }
  };

  const stopWaveRecording = () => {
    if (recordPluginRef.current?.isRecording()) {
      recordPluginRef.current.stopRecording();
    }
  };

  return { waveformRef, duration, startWaveRecording, stopWaveRecording };
};

export default useWaveSurfer;