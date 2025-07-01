import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ChapterApi } from "../Context/ChapterContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ChapterComponent = () => {
  const { chapters, selectedChapterId, handleSelectChapter } =
    useContext(ChapterApi);

  return (
    <Box
      className="w-full max-w-4xl mx-auto py-4 relative overflow-hidden"
      sx={{
        position: "relative",
        "&:hover .nav-button": {
          opacity: 1,
        },
      }}
    >
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView="auto"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
          600: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 6,
            spaceBetween: 12,
          },
          1200: {
            slidesPerView: 7,
            spaceBetween: 12,
          },
        }}
        className="chapter-swiper "
        style={{
          padding: "0 32px",
          overflow: "visible",
        }}
      >
        {chapters.map((chapter) => (
          <SwiperSlide
            key={chapter.id}
            style={{
              width: "auto",
              height: "auto",
            }}
          >
            <Box
              onClick={() => handleSelectChapter(chapter)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer 
                border transition-all duration-200 ease-in-out 
                hover:shadow-sm transform hover:-translate-y-1
                ${
                  selectedChapterId === chapter.id
                    ? "border-indigo-500 bg-indigo-50/70 text-indigo-700 shadow-indigo-sm"
                    : "border-gray-100 bg-white/80 text-gray-600 hover:bg-gray-50/50"
                }
              `}
              sx={{
                minWidth: { xs: "64px", sm: "72px", md: "80px" },
                height: { xs: "84px", sm: "88px", md: "92px" },
                mx: "auto",
                backdropFilter: "blur(4px)",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {chapter?.imgsrc ? (
                <Box
                  component="img"
                  src={chapter.imgsrc}
                  alt={chapter.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full object-cover border border-white shadow-xs mb-1"
                  sx={{
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    },
                  }}
                />
              ) : (
                <Box
                  component="div"
                  // src={chapter.imgsrc}
                  // alt={chapter.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full  flex justify-center items-center object-cover border border-white shadow-xs mb-1"
                  sx={{
                    transition: "all 0.3s ease-in-out",
                    fontWeight:"700",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {chapter.id}
                </Box>
              )}

              <Typography
                variant="caption"
                className="font-medium text-center line-clamp-2"
                sx={{
                  fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                  lineHeight: { xs: "1rem", sm: "1.1rem" },
                  color:
                    selectedChapterId === chapter.id
                      ? "primary.main"
                      : "text.secondary",
                  fontWeight: selectedChapterId === chapter.id ? 600 : 500,
                }}
              >
                {chapter.name}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {chapters.length > 4 && (
        <>
          <Box
            className="swiper-button-prev nav-button absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-md rounded-full w-7 h-7 flex items-center justify-center z-10 cursor-pointer"
            sx={{
              opacity: 0,
              transition: "opacity 0.3s ease",
              left: { xs: "4px", sm: "8px" },
              "&::after": { display: "none" },
            }}
          >
            <svg
              className="w-3 h-3 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Box>
          <Box
            className="swiper-button-next nav-button absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-md rounded-full w-7 h-7 flex items-center justify-center z-10 cursor-pointer"
            sx={{
              opacity: 0,
              transition: "opacity 0.3s ease",
              right: { xs: "4px", sm: "8px" },
              "&::after": { display: "none" },
            }}
          >
            <svg
              className="w-3 h-3 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChapterComponent;
