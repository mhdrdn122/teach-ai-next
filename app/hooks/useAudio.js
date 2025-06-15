import { useRef } from "react";

const useAudio = () => {
  const successSound = useRef(null);
  const failureSound = useRef(null);
  const questionAudio = useRef(null);

  return {
    successSound,
    failureSound,
    questionAudio,
  };
};

export default useAudio;