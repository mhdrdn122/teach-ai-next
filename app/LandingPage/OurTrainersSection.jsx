// components/OurTrainersSection.jsx
"use client";

import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Image from "next/image";

const OurTrainersSection = () => {
  const trainers = [
    {
      id: 1,
      image: "/assets/images/team1.png", 
      name: "جين كوبر",
      role: "المؤسس والرئيس التنفيذي",
    },
    {
      id: 2,
      image: "/assets/images/team1.png", 
      name: "جاي هوكينز",
      role: "معلم ما قبل المدرسة",
    },
    {
      id: 3,
      image: "/assets/images/team1.png", 
      name: "أرلين مكوي",
      role: "فنان تعليمي",
    },
    {
      id: 4,
      image: "/assets/images/team1.png", 
      name: "ديان راسل",
      role: "معلمة محو الأمية",
    },
    {
      id: 5,
      image: "/assets/images/team1.png", 
      name: "ديفون لين",
      role: "معلمة محو الأمية",
    },
  ];

  return (
    <Box
    id="team"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        // backgroundColor: "#e0f7fa",
        color: "#14043c",
        textAlign: "center",
        position: 'relative',
        overflow: 'hidden',
      }}
      className="container mx-auto"
      dir="rtl"
    >
      {/* صور متناثرة */}
      {/* <Image
        src="/assets/images/decorative/rocket.png"
        alt="Star"
        width={30}
        height={30}
        style={{ position: 'absolute', top: '8%', right: '15%', zIndex: 0, animation: 'spin 10s linear infinite reverse' }}
      />
      <Image
        src="/assets/images/decorative/stars.png" // استخدم صورة غيمة أخرى أو أي شكل
        alt="Cloud"
        width={30}
        height={40}
        style={{ position: 'absolute', top: '20%', left: '8%', zIndex: 0, transform: 'rotate(5deg)' }}
      />
      <Image
        src="/assets/images/decorative/rocket.png"
        alt="Rocket"
        width={25}
        height={50}
        style={{ position: 'absolute', bottom: '10%', right: '1%', zIndex: 0, transform: 'rotate(45deg)' }}
      />
       <Image
        src="/assets/images/decorative/stars.png"
        alt="Candy"
        width={40}
        height={40}
        style={{ position: 'absolute', bottom: '25%', left: '20%', zIndex: 0, transform: 'rotate(-25deg)' }}
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
        مدربونا
      </Typography>

      <Box
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6" // تصميم مستجيب للشبكة
        sx={{
          justifyItems: "center",
        }}
      >
        {trainers.map((trainer) => (
          <Card
            key={trainer.id}
            sx={{
              maxWidth: 180, 
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2, 
            }}
          >
            <Image
              src={trainer.image}
              alt={trainer.name}
              width={100} 
              height={100} 
              style={{
                borderRadius: "50%", 
                objectFit: "contain",
                mb: 2, 
                border: '3px solid #4cb0b3',
                height:"150px",
                width:"150px",
                maxHeight:"150px"
              }}
            />
            <CardContent sx={{ p: 1, '&:last-child': { pb: 1 }, textAlign: 'center' }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{ fontSize: '1.1rem', fontWeight: "bold", color: "#14043c", mb: 0.5 }}
              >
                {trainer.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#495057", fontSize: '0.9rem' }}>
                {trainer.role}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default OurTrainersSection;