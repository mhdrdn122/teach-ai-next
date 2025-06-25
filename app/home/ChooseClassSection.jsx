// components/ChooseClassSection.jsx
"use client";

import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material"; // Rating لم تعد ضرورية بنفس الشكل
import Image from "next/image";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import StarIcon from "@mui/icons-material/Star";

const ChooseClassSection = () => {
  const classes = [
    {
      id: 1,
      image: "/assets/images/cho3.png",
      title: "تعلم القراءة والكتابة والعد",
      students: 70,
      rating: 4.5,
    },
    {
      id: 2,
      image: "/assets/images/cho3.png",
      title: "معرفة الأرض والعالم",
      students: 190,
      rating: 4.8,
    },
    {
      id: 3,
      image: "/assets/images/cho3.png",
      title: "تنمية الإبداع والمهارات",
      students: 110,
      rating: 4.7,
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        // backgroundColor: "#ffb367",
        color: "#14043c",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
      className="container mx-auto"
      dir="rtl"
    >
      {/* صور متناثرة */}
      {/* <Image
        src="/assets/images/decorative/stars.png"
        alt="Star"
        width={35}
        height={35}
        style={{ position: 'absolute', top: '10%', left: '5%', zIndex: 0, animation: 'spin 12s linear infinite' }}
      />
      <Image
        src="/assets/images/decorative/rocket.png"
        alt="Candy"
        width={45}
        height={45}
        style={{ position: 'absolute', top: '20%', right: '10%', zIndex: 0, transform: 'rotate(15deg)' }}
      /> */}

      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: { xs: 6, md: 8 },
          fontWeight: "bold",
          fontSize: { xs: "2rem", md: "3rem" },
          color: "#14043c",
        }}
      >
        اختر الفئة التي تناسب احتياجك
      </Typography>

      <Box
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        sx={{
          justifyItems: "center",
        }}
      >
        {classes.map((course) => (
          <Card
            key={course.id}
            sx={{
              maxWidth: 480,
              width:400,
              borderRadius: "12px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-8px)",
              },
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
            }}
          >
              
            <CardMedia sx={{margin:"0 auto"}} >
              <Image
                src={course.image}
                alt={course.title}
                width={280}
                height={100}
                style={{
                  objectFit: "cover",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              />
            </CardMedia>
            <CardContent sx={{ p: 3, flexGrow: 1, textAlign: "right" }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{ mb: 1.5, fontWeight: "bold", color: "#14043c" }}
              >
                {course.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#495057",
                  }}
                >
                  <PeopleOutlineIcon sx={{ mr: 0.5, fontSize: "1.2rem" }} />
                  <Typography variant="body2">
                    {course.students} طالب
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#495057",
                  }}
                >
                  {/* نجمة ذهبية واحدة */}
                  <StarIcon
                    sx={{ color: "#ffc107", fontSize: "1.2rem", mr: 0.5 }}
                  />
                  <Typography variant="body2">{course.rating}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ChooseClassSection;
