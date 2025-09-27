"use client"
import { Typography, Button } from '@mui/material'
import React, { useEffect, useRef } from 'react' 
import { synthesizeText } from './ttsClient'

const TextQuestion = ({ text }) => {
  console.log(text)
  const isInitialMount = useRef(true); 

  const handlePlay = async (txt) => {
    const audioContent = await synthesizeText(txt);
    if (audioContent) {
      const audio = new Audio("data:audio/mp3;base64," + audioContent);
      audio.play();
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false; 
      return; 
    }
    
    handlePlay(text) 
    
  }, [text])
  
  return (
    <>
      <Typography sx={{ fontSize: { xs: 18, sm: 20, md: 22 }, p: 2 }}>
        {text}
      </Typography>
      {/* <Button onClick={() => handlePlay("مرحبا")}>تشغيل الصوت يدويًا</Button> */}
    </>
  )
}

export default TextQuestion