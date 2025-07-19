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
      className="w-full xs:px-[32px] sm:px-[40px] md:px-[50px]  relative max-w-4xl mx-auto py-4 overflow-hidden"
     
    >
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          600: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          900: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 7,
            spaceBetween: 24,
          },
        }}
        className="chapter-swiper"
      >
        {chapters.map((chapter) => (
          <SwiperSlide key={chapter.id} className="h-auto">
            <Box
              onClick={() => handleSelectChapter(chapter)}
              className={`
                flex flex-col items-center justify-center p-2 text-4xl rounded-xl cursor-pointer
                border transition-all duration-200 ease-in-out
                hover:shadow-sm transform hover:-translate-y-1
                xs:min-w-[80px] sm:min-w-[90px]  md:min-w-[100px]
                xs:min-h-[90px] sm:min-h-[94px]  md:min-h-[100px]
                mx-auto
                backdrop-filter: blur(4px) 
                     
                ${
                  selectedChapterId === chapter.id
                    ? "border-indigo-500 bg-indigo-50/70 text-indigo-700 scale-120 shadow-indigo-sm"
                    : "border-gray-100 bg-white/80 text-gray-600 hover:bg-gray-50/50"
                }
              `}
              sx={{
                // minWidth: { xs: "80px", sm: "90px", md: "100px" },
                // height: { xs: "90px", sm: "94px", md: "100px" },
                // mx: "auto",
                // backdropFilter: "blur(4px)",
                // transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundColor: chapter.bgColor,
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
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex justify-center items-center object-cover border border-white shadow-xs mb-1"
                  sx={{
                    transition: "all 0.3s ease-in-out",
                    fontWeight: "700",
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
                className="font-medium text-4xl text-center line-clamp-2"
                sx={{
                  fontSize: { xs: "0.85rem", sm: "0.8rem", md: "0.9rem" },
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

      {chapters.length > 4 && (
        <>
          <Box
            className="swiper-button-prev-custom nav-button absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 shadow-md rounded-full w-7 h-7 flex items-center justify-center z-10 cursor-pointer"
            sx={{
              opacity: 1,
              transition: "opacity 0.3s ease",
              left: { xs: "8px", sm: "12px", md: "15px" },
              "&::after": { display: "none" },
              ".MuiBox-root:hover &": { opacity: 1 },
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
            className="swiper-button-next-custom nav-button absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 shadow-md rounded-full w-7 h-7 flex items-center justify-center z-10 cursor-pointer"
            sx={{
              opacity: 1,
              transition: "opacity 0.3s ease",
              right: { xs: "8px", sm: "12px", md: "15px" },
              "&::after": { display: "none" },
              ".MuiBox-root:hover &": { opacity: 1 },
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
