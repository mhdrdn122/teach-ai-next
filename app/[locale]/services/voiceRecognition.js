// services/voiceRecognition.js
import { toast } from "react-toastify";

let recognitionInstance = null;

export const startVoiceRecognition = () => {
  return new Promise((resolve, reject) => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      reject("Speech Recognition API is not supported in this browser.");
      toast.error("متصفحك لا يدعم التعرف على الصوت.");
      return;
    }

    if (recognitionInstance) {
      recognitionInstance.stop();
    }

    recognitionInstance = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognitionInstance.lang = "ar-SA";
    recognitionInstance.continuous = false; 
    recognitionInstance.interimResults = false;

    let finalTranscript = ''; 

    recognitionInstance.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      console.log("النص المرحلي:", interimTranscript);
    };

    recognitionInstance.onend = () => {
      if (finalTranscript.trim()) {
        resolve(finalTranscript.trim());
      } else {
        reject("الصوت غير واضح أو لم يتم التعرف على شيء.");
        toast.error("الصوت غير واضح أو لم يتم التعرف على شيء.");
      }
      recognitionInstance = null; 
    };

    recognitionInstance.onerror = (event) => {
      if (event.error === 'no-speech') {
        reject("لم يتم اكتشاف أي صوت.");
        toast.error("لم يتم اكتشاف أي صوت.");
      } else if (event.error === 'audio-capture') {
        reject("مشكلة في الميكروفون أو أذونات الوصول.");
        toast.error("مشكلة في الميكروفون أو أذونات الوصول.");
      } else {
        reject(`خطأ في التعرف على الصوت: ${event.error}`);
        toast.error(`خطأ في التعرف على الصوت: ${event.error}`);
      }
      recognitionInstance = null;
    };

    recognitionInstance.start();
    console.log("بدء التعرف على الصوت...");
  });
};

export const stopVoiceRecognition = () => {
  if (recognitionInstance) {
    recognitionInstance.stop();
    console.log("إيقاف التعرف على الصوت.");
    recognitionInstance = null; 
  }
};