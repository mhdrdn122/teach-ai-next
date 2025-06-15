"use client";

import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";

const QuestionMedia = ({ src, alt, highlighted }) => {
  const videoRef = useRef(null);
  let parts = src.split("/");
  let lastElement = parts[parts.length - 1];
  let extension = lastElement ? lastElement.split(".")[1]?.toLowerCase() : "";

  useEffect(() => {
    if (extension === "mp4" && videoRef.current) {
      videoRef.current.play();
    }
  }, [extension]);


  const commonMediaClasses = `
    rounded-2xl 
    w-full 
    shadow-md 
    transition-all 
    duration-300 
    ease-in-out
    ${highlighted ? "grayscale-0 border-green-500 border-4 block" : "grayscale border-none hidden"}
  `;

  return (
    <>
      {extension === "mp4" ? (
        <Box
          component="video"
          ref={videoRef}
          src={src}
          alt={alt}
          controls={false}
          autoPlay
          loop={false}
          className={`${commonMediaClasses} aspect-square max-w-[800px]`} 
        />
      ) : (
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{margin:"0 auto"}}
          className={`${commonMediaClasses} aspect-[4/3] m-auto max-w-[600px]`} 
        />
      )}
    </>
  );
};

export default QuestionMedia;