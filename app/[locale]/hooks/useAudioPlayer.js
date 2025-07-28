import { useRef, useCallback } from "react";

const useAudioPlayer = () => {
  const successSoundRef = useRef(null);
  const failureSoundRef = useRef(null);
  const questionAudioRef = useRef(null);

  const playSound = useCallback((type) => {
    const audioRef = type === "success" ? successSoundRef : type === "failure" ? failureSoundRef : questionAudioRef;
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, []);

  return { successSoundRef, failureSoundRef, questionAudioRef, playSound };
};

export default useAudioPlayer;