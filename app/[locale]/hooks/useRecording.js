// Custom hook for handling voice recording and processing for questions and answers.
// This hook manages the recording state, processes voice input to detect questions or verify answers,
// and updates the UI state accordingly. It is used twice in the app: once for question recording
// (type="question") and once for answer recording (type="answer"). The hook integrates with
// external services for voice recognition, question identification, and answer validation,
// and provides feedback through audio, confetti, and toast notifications.

import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import {
  startVoiceRecognition,
  stopVoiceRecognition,
} from "../services/voiceRecognition";
import {
  getQuestionIdFromGemini,
  checkAnswerFromGemini,
} from "../services/geminiService";
import { speakArabicText } from "../services/speechUtils";
import {
  showSuccessConfetti,
  showFailureConfetti,
} from "../services/confettiUtils";
import handleError from "../services/errorHandler";

// Hook parameters:
// - type: Either "question" or "answer" to determine the recording mode.
// - data: Contains questions list and (for answers) the detected question ID.
// - questionAudioRef: Reference to the audio element for playing question audio.
// - successSoundRef, failureSoundRef: Audio references for feedback sounds.
const useRecording = (
  type,
  data,
  questionAudioRef,
  successSoundRef,
  failureSoundRef
) => {





  // State for tracking recording status
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  
  // State for loading indicators during question/answer processing
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  
  // State for storing question and answer results
  const [questionResult, setQuestionResult] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  
  // State to control the answer button's disabled state
  const [disableAnswerButton, setDisableAnswerButton] = useState(true);

  // Stops the voice recording and resets relevant states
  const stopRecording = useCallback(() => {
    setIsRecordingActive(false);
    setAnswerResult(null); // Clear answer result when recording stops
    stopVoiceRecognition(); // Stop the voice recognition service
  }, []);

  // Starts recording for either a question or an answer
  const startRecording = useCallback(async () => {
    setIsRecordingActive(true);
    setAnswerResult(null); // Clear previous answer result at the start of recording

    try {
      if (type === "question") {
        // Handle question recording
        setQuestionResult(null); // Clear previous question result
        setIsLoadingQuestion(true); // Show loading indicator
        setDisableAnswerButton(true); // Disable answer button until question is detected

        // Capture voice input
        const text = await startVoiceRecognition();
        setAnswerResult(null); // Ensure answer result is cleared for new question

        let detectedQuestion = null;
        if (text) {
          // Identify question ID using Gemini service
          const questionId = await getQuestionIdFromGemini(data, text);
          detectedQuestion = data.find((q) => q.id === questionId);
        }
        //  handlePlay(detectedQuestion?.question);

        // Handle case where question is not found
        if (!detectedQuestion) {
          detectedQuestion = {
            id: 0,
            src: "/assets/images/not.gif",
            question: "هذا السؤال غير موجود", // "This question does not exist"
            answer: "",
          };
          toast.error("لم يتم العثور على السؤال."); // Show error toast
        }

        // Update question result and play audio feedback
        setQuestionResult(detectedQuestion);
        // speakArabicText(detectedQuestion.question);

        // Play question audio if available
        if (questionAudioRef.current && detectedQuestion.questionVoice) {
          questionAudioRef.current.src = detectedQuestion.questionVoice;
          questionAudioRef.current.play();
        }

        // Enable/disable answer button based on whether the question has an answer
        setDisableAnswerButton(!detectedQuestion.answer);
        console.log(detectedQuestion); // Log detected question for debugging
      } else if (type === "answer") {
        // Handle answer recording
        setIsLoadingAnswer(true); // Show loading indicator
        setAnswerResult(null); // Clear previous answer result

        // Find the question corresponding to the detected question ID
        const question = data.questions.find(
          (q) => q.id === data.detectedQuestionId
        );
        console.log(question); // Log question for debugging
        setDisableAnswerButton(question.answer === " " ? true : false);

        // Handle case where question is not found
        if (!question) {
          handleError(
            new Error("Question not found"),
            "لم يتم العثور على السؤال." // "Question not found"
          );
          return;
        }

        // Capture voice input and validate answer
        const text = await startVoiceRecognition();
        const isCorrect = await checkAnswerFromGemini(question, text);
        setAnswerResult({
          userAnswer: text || " ",
          isCorrect,
          correctAnswer: question.answer,
        });

        // Provide feedback based on answer correctness
        if (isCorrect === "صحيحة") {
          toast.success("إجابة صحيحة! 🎉"); // "Correct answer!"
          successSoundRef.current?.play();
          showSuccessConfetti();
        } else {
          toast.error("إجابة خاطئة! 😞"); // "Incorrect answer!"
          failureSoundRef.current?.play();
          showFailureConfetti();
        }
      }
    } catch (error) {
      // Handle errors during voice recognition
      handleError(error, "خطأ في التعرف على الصوت."); // "Error in voice recognition"
      setIsRecordingActive(false);
      setIsLoadingQuestion(false);
      setIsLoadingAnswer(false);
      setDisableAnswerButton(true);
      stopVoiceRecognition();
    } finally {
      // Reset loading and recording states
      setIsRecordingActive(false);
      setIsLoadingQuestion(false);
      setIsLoadingAnswer(false);
    }
  }, [
    type,
    data,
    questionAudioRef,
    successSoundRef,
    failureSoundRef,
  ]);

  // Effect to manage answer button state and reset answer result for question hook
  useEffect(() => {
    if (
      type === "answer" &&
      data &&
      data.detectedQuestionId &&
      data.questions
    ) {
      // Update answer button state based on the selected question
      const question = data.questions.find(
        (q) => q.id === data.detectedQuestionId
      );
      setDisableAnswerButton(
        !question ||
          !question.answer ||
          question.answer.trim() === " " ||
          question.answer.trim() === ""
      );
    } else if (type === "question") {
      // Reset answer result and disable answer button for question hook
      setAnswerResult(null);
      setDisableAnswerButton(true);
    }
  }, [type, data, isLoadingQuestion]);

  // Effect to reset answer result when the question changes in the answer hook
  useEffect(() => {
    if (type === "answer" && data?.detectedQuestionId) {
      setAnswerResult(null); // Clear answer result when the question ID changes
    }
  }, [type, data?.detectedQuestionId]);

  // Debugging: Log answerResult for both hooks

  // Reset answer result programmatically
  const resetAnswerResult = useCallback(() => {
    setAnswerResult(null);
  }, []);

  // Return all states and functions for use in the component
  return {
    isRecordingActive,
    isLoadingAnswer,
    isLoadingQuestion,
    answerResult,
    questionResult,
    disableAnswerButton,
    startRecording,
    stopRecording,
    resetAnswerResult,
  };
};

export default useRecording;