"use client";

import { createContext, useState, useEffect, useCallback } from "react";

const ChapterApi = createContext();

const CHAPTER_KEY = 'selectedChapter';

const chaptersData = [
  {
    id: 1,
    name: "Chapter 1",
    // imgsrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFhlQEw6PSx3BF6SapgxqFZsxLB0HUyk5pg&s",
    bgColor: "#90CAF9", // أزرق أغمق قليلاً
  },
  {
    id: 2,
    name: "Chapter 2",
    // imgsrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTui84v6Im0h-2eYfzUVfcjvGueEmO4u3f6Hw&s",
    bgColor: "#A5D6A7", // أخضر أغمق قليلاً
  },
  {
    id: 3,
    name: "Chapter 3",
    // imgsrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvJmVXglGUb7kKlhtn-fqnkd4cqeFlvRPqjg&s",
    bgColor: "#FFECB3", // أصفر/ذهبي أغمق قليلاً
  },
  {
    id: 4,
    name: "Chapter 4",
    imgsrc: "",
    bgColor: "#FFAB91", // برتقالي/وردي أغمق قليلاً
  },
  {
    id: 5,
    name: "Chapter 5",
    imgsrc: "",
    bgColor: "#CE93D8", // بنفسجي أغمق قليلاً
  },
  {
    id: 6,
    name: "Chapter 6",
    imgsrc: "",
    bgColor: "#F8BBD0", // وردي أغمق قليلاً
  },
  {
    id: 7,
    name: "Chapter 7",
    imgsrc: "",
    bgColor: "#9FA8DA", // بنفسجي مزرق أغمق قليلاً
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