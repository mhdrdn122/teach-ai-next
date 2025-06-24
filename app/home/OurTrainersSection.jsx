// components/OurTrainersSection.jsx
"use client";

import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Image from "next/image";

const OurTrainersSection = () => {
  const trainers = [
    {
      id: 1,
      image: "/assets/images/trainer-jane-cooper.png", // تأكد من مسار الصورة
      name: "جين كوبر",
      role: "المؤسس والرئيس التنفيذي",
    },
    {
      id: 2,
      image: "/assets/images/trainer-guy-hawkins.png", // تأكد من مسار الصورة
      name: "جاي هوكينز",
      role: "معلم ما قبل المدرسة",
    },
    {
      id: 3,
      image: "/assets/images/trainer-arlene-mccoy.png", // تأكد من مسار الصورة
      name: "أرلين مكوي",
      role: "فنان تعليمي",
    },
    {
      id: 4,
      image: "/assets/images/trainer-dianne-russell.png", // تأكد من مسار الصورة
      name: "ديان راسل",
      role: "معلمة محو الأمية",
    },
    {
      id: 5,
      image: "/assets/images/trainer-devon-lane.png", // تأكد من مسار الصورة
      name: "ديفون لين",
      role: "معلمة محو الأمية",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        backgroundColor: "#e0f7fa", // لون خلفية أزرق فاتح (يمكن تعديله ليناسب تصميمك)
        color: "#14043c",
        textAlign: "center",
        position: 'relative',
        overflow: 'hidden',
      }}
      className="container mx-auto"
      dir="rtl"
    >
      {/* صور متناثرة */}
      <Image
        src="/assets/images/decorative/star-icon.png"
        alt="Star"
        width={30}
        height={30}
        style={{ position: 'absolute', top: '8%', right: '15%', zIndex: 0, animation: 'spin 10s linear infinite reverse' }}
      />
      <Image
        src="/assets/images/decorative/cloud-bottom.png" // استخدم صورة غيمة أخرى أو أي شكل
        alt="Cloud"
        width={70}
        height={40}
        style={{ position: 'absolute', top: '20%', left: '8%', zIndex: 0, transform: 'rotate(5deg)' }}
      />
      <Image
        src="/assets/images/decorative/rocket-icon.png"
        alt="Rocket"
        width={50}
        height={50}
        style={{ position: 'absolute', bottom: '10%', right: '10%', zIndex: 0, transform: 'rotate(45deg)' }}
      />
       <Image
        src="/assets/images/decorative/candy-icon.png"
        alt="Candy"
        width={40}
        height={40}
        style={{ position: 'absolute', bottom: '25%', left: '20%', zIndex: 0, transform: 'rotate(-25deg)' }}
      />

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
              maxWidth: 180, // حجم أصغر للبطاقة ليتناسب مع عدد المدربين
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // مركزة المحتوى داخل البطاقة
              p: 2, // padding داخلي للبطاقة
            }}
          >
            <Image
              src={trainer.image}
              alt={trainer.name}
              width={120} // حجم الصورة داخل البطاقة
              height={120} // حجم الصورة داخل البطاقة
              style={{
                borderRadius: "50%", // لجعل الصورة دائرية
                objectFit: "cover",
                mb: 2, // مسافة أسفل الصورة
                border: '3px solid #4cb0b3' // حدود حول الصورة
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