import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ChapterApi } from "../Context/ChapterContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ChapterComponent = () => {
  const { chapters, selectedChapterId, handleSelectChapter } = useContext(ChapterApi);

  return (
    <Box
      className="w-full max-w-4xl mx-auto py-6 relative"
      sx={{ position: "relative" }}
    >
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={4}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          960: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
        }}
        className="chapter-swiper"
        style={{ padding: "0 40px" }}
      >
        {chapters.map((chapter) => (
          <SwiperSlide key={chapter.id}>
            <Box
              onClick={() => handleSelectChapter(chapter)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer 
                border-2 transition-all duration-300 ease-in-out 
                shadow-md hover:shadow-xl transform hover:-translate-y-0.5
                ${
                  selectedChapterId === chapter.id
                    ? "border-indigo-600 bg-gradient-to-br from-indigo-50 to-blue-100 text-indigo-800 scale-105"
                    : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                }
              `}
              sx={{
                minWidth: { xs: "100px", sm: "130px", md: "150px" },
                maxWidth: { xs: "100px", sm: "130px", md: "150px" },
                height: "auto",
                mx: "auto",
              }}
            >
              <Box
                component="img"
                src={chapter.imgsrc}
                alt={chapter.name}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full object-cover border-2 border-gray-200 shadow-sm mb-2"
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              />
              <Typography
                variant="body2"
                className="font-semibold text-center text-xs sm:text-sm md:text-base"
                sx={{
                  color: selectedChapterId === chapter.id ? "inherit" : "text-gray-700",
                }}
              >
                {chapter.name}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <Box
        className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full w-8 h-8 flex items-center justify-center z-10"
        sx={{ display: chapters.length > 3 ? "flex" : "none" }}
      >
        <svg
          className="w-4 h-4 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Box>
      <Box
        className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full w-8 h-8 flex items-center justify-center z-10"
        sx={{ display: chapters.length > 3 ? "flex" : "none" }}
      >
        <svg
          className="w-4 h-4 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Box>
    </Box>
  );
};

export default ChapterComponent;