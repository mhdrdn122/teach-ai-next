"use client"
import { Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

/**
 * Component: TextQuestion
 * - Renders a text on screen.
 * - Automatically sends text to the backend (Google TTS API via /api/tts).
 * - Plays back the generated speech as audio.
 */
const TextQuestion = ({ text }) => {
  const isInitialMount = useRef(true); // Prevent TTS on first render
  const [loading, setLoading] = useState(false); // Loading state while fetching TTS audio

  /**
   * Call backend API to synthesize speech from text.
   * Plays audio if conversion succeeds.
   */
  async function playTTS(text) {
    setLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.audioContent) {
        // Convert Base64 audio into playable mp3
        const audio = new Audio("data:audio/mp3;base64," + data.audioContent);
        audio.play();
      } else {
        console.error("TTS Error:", data.error);
      }
    } catch (error) {
      console.error("TTS Request Failed:", error);
      setLoading(false);
    }
  }

  /**
   * Effect: Trigger TTS when `text` changes (excluding first render).
   */
  useEffect(() => {
  if (text && text.trim() !== "") {
    playTTS(text);
  }
}, [text]);

  return (
    <>
      <Typography sx={{ fontSize: { xs: 18, sm: 20, md: 22 }, p: 2 }}>
        {!loading ? text : "جاري التحدث..."}
      </Typography>
    </>
  )
}

export default TextQuestion
