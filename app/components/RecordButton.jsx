"use client";

import React from "react";
import { Button } from "@mui/material";

const RecordButton = ({ onMouseDown, onMouseUp, text, active, disabled }) => {
  return (
    <Button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchEnd={onMouseUp}
      disabled={text === "🎙️ تسجيل السؤال" ? false : disabled === " " ? true : false}
      variant="contained" 
      className={`
        py-2 px-4 m-1 
        bg-blue-500 text-white 
        rounded 
        cursor-pointer 
        transition-colors 
        duration-200 
        ease-in-out 
        hover:bg-blue-700 
        disabled:bg-gray-400 
        disabled:cursor-not-allowed 
        select-none 
        ${active ? "opacity-100" : "opacity-70"}
      `}
    >
      {text}
    </Button>
  );
};

export default RecordButton;