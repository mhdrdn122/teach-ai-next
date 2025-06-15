"use client";

import { createContext, useState, useEffect, useCallback } from "react";

const ChapterApi = createContext();

const CHAPTER_KEY = 'selectedChapter';

const chaptersData = [
  {
    id: 1,
    name: "Chapter 1",
    imgsrc: "https://t3.ftcdn.net/jpg/08/45/49/40/360_F_845494007_z4J3XCFg7YCVidJ9PMJ2RUVAhVuUsmQV.jpg",
    bgColor: "#e0f2fe",
  },
  {
    id: 2,
    name: "Chapter 2",
    imgsrc: "https://t3.ftcdn.net/jpg/08/45/49/40/360_F_845494007_z4J3XCFg7YCVidJ9PMJ2RUVAhVuUsmQV.jpg",
    bgColor: "#dcfce7",
  },
  {
    id: 3,
    name: "Chapter 3",
    imgsrc: "https://t3.ftcdn.net/jpg/08/45/49/40/360_F_845494007_z4J3XCFg7YCVidJ9PMJ2RUVAhVuUsmQV.jpg",
    bgColor: "#fefce8",
  },
  {
    id: 4,
    name: "Chapter 4",
    imgsrc: "https://t3.ftcdn.net/jpg/08/45/49/40/360_F_845494007_z4J3XCFg7YCVidJ9PMJ2RUVAhVuUsmQV.jpg",
    bgColor: "#fee2e2",
  },
  {
    id: 5,
    name: "Chapter 5",
    imgsrc: "https://t3.ftcdn.net/jpg/08/45/49/40/360_F_845494007_z4J3XCFg7YCVidJ9PMJ2RUVAhVuUsmQV.jpg",
    bgColor: "#f3e8ff",
  },
  {
    id: 6,
    name: "Chapter 6",
    imgsrc: "https://t3.ftcdn.net/jpg/08/45/49/40/360_F_845494007_z4J3XCFg7YCVidJ9PMJ2RUVAhVuUsmQV.jpg",
    bgColor: "#fce7f3",
  },
  {
    id: 7,
    name: "Chapter 7",
    imgsrc: "https://t3.ftcdn.net/jpg/08/45/49/40/360_F_845494007_z4J3XCFg7YCVidJ9PMJ2RUVAhVuUsmQV.jpg",
    bgColor: "#e0e7ff",
  },
];

const ChapterContext = ({ children }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedChapter = localStorage.getItem(CHAPTER_KEY);
      if (storedChapter) {
        try {
          const parsedChapter = JSON.parse(storedChapter);
          const foundChapter = chaptersData.find(c => c.id === parsedChapter.id);
          if (foundChapter) {
            setSelectedChapter(foundChapter);
          } else {
            setSelectedChapter(chaptersData[0]);
          }
        } catch (e) {
          console.error("Error parsing stored chapter from localStorage:", e);
          setSelectedChapter(chaptersData[0]);
        }
      } else if (chaptersData.length > 0) {
        setSelectedChapter(chaptersData[0]);
      }
    }
  }, []);

  const handleSelectChapter = useCallback((chapter) => {
    setSelectedChapter(chapter);
    if (typeof window !== 'undefined') {
      localStorage.setItem(CHAPTER_KEY, JSON.stringify(chapter));
    }
  }, []);

  const getBackgroundColor = useCallback(() => {
    return selectedChapter ? selectedChapter.bgColor : "#f3f4f6";
  }, [selectedChapter]);

  const value = {
    chapters: chaptersData,
    selectedChapterId: selectedChapter?.id,
    chapterDetails: selectedChapter,
    handleSelectChapter,
    getBackgroundColor,
  };

  return (
    <ChapterApi.Provider value={value}>
      {children}
    </ChapterApi.Provider>
  );
};

export { ChapterApi, ChapterContext };