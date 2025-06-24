"use client";

import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import Image from 'next/image';

const ProgramComponent = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        textAlign: 'center',
        color: '#14043c',
        position: 'relative', 
        overflow: 'hidden', 
      }}
      className="container mx-auto"
    >
      {/* Decorative Images */}
      <Image
        src="/assets/images/decorative/rocket.png"
        alt="Rocket"
        width={70}
        height={70}
        style={{ position: 'absolute', top: '15%', left: '8%', zIndex: 1, transform: 'rotate(-20deg)' }}
      />
      <Image
        src="/assets/images/decorative/stars.png"
        alt="Star"
        width={40}
        height={40}
        style={{ position: 'absolute', top: '5%', right: '10%', zIndex: 1, animation: 'spin 10s linear infinite' }}
      />
      <Image
        src="/assets/images/decorative/rocket.png"
        alt="Candy"
        width={50}
        height={50}
        style={{ position: 'absolute', bottom: '10%', left: '15%', zIndex: 1, transform: 'rotate(30deg)' }}
      />
      <Image
        src="/assets/images/decorative/stars.png"
        alt="Star"
        width={30}
        height={30}
        style={{ position: 'absolute', bottom: '20%', right: '8%', zIndex: 1, animation: 'spin 8s linear infinite' }}
      />

      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          fontSize: { xs: '2rem', md: '3rem' },
        }}
      >
        برنامجنا التعليمي المبتكر
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: { xs: 6, md: 8 },
          mx: 'auto',
          maxWidth: '800px',
          fontSize: { xs: '1rem', md: '1.15rem' },
          lineHeight: 1.7,
        }}
      >
        نقدم في TeachAi منهجًا تعليميًا متكاملاً يجمع بين أحدث تقنيات الذكاء الاصطناعي والمحتوى التفاعلي لضمان تجربة تعلم ممتعة وفعالة لأطفالكم. برنامجنا مصمم لتنمية التفكير النقدي والمهارات المستقبلية.
      </Typography>

      <Box
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        sx={{
          justifyItems: 'center',
        }}
      >
        {/* Card 1: Interactive Learning */}
        <Card
          sx={{
            maxWidth: 380,
            boxShadow: 'none',
            border: '2px dashed #4cb0b3',
            borderRadius: '12px',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardMedia>
            <Image
              src="/assets/images/prigram1.jfif"
              alt="التعلم التفاعلي"
              width={380}
              height={200}
              style={{ objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
            />
          </CardMedia>
          <CardContent sx={{ p: 3, flexGrow: 1 }}>
            <Typography variant="h5" component="h3" sx={{ mb: 1.5, fontWeight: 'bold', color: '#14043c' }}>
              التعلم التفاعلي بالذكاء الاصطناعي
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#495057' }}>
              من خلال الأنشطة والألعاب المعتمدة على الذكاء الاصطناعي، يتمكن الأطفال من استكشاف المفاهيم العلمية بطريقة شيقة وتجريبية.
            </Typography>
          </CardContent>
        </Card>

        {/* Card 2: Personalized Learning Paths (Orange Background) */}
        <Card
          sx={{
            maxWidth: 380,
            boxShadow: 'none',
            border: '2px dashed #4cb0b3',
            borderRadius: '12px',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            },
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ff9800', // Orange background for the middle card
            color: 'white', // Text color for the middle card
            '& .MuiTypography-root': { // Target Typography inside this card
                color: 'white', // Ensure text is white for contrast
            },
          }}
        >
          <CardMedia>
            <Image
              src="/assets/images/prigram1.jfif"
              alt="مسارات تعليمية مخصصة"
              width={380}
              height={200}
              style={{ objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
            />
          </CardMedia>
          <CardContent sx={{ p: 3, flexGrow: 1 }}>
            <Typography variant="h5" component="h3" sx={{ mb: 1.5, fontWeight: 'bold' }}>
              مسارات تعليمية مخصصة
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              يتكيف برنامجنا مع مستوى كل طفل واهتماماته، مقدمًا محتوى مخصصًا يضمن أقصى استفادة وتطور مستمر للمهارات.
            </Typography>
          </CardContent>
        </Card>

        {/* Card 3: Comprehensive Progress Reports */}
        <Card
          sx={{
            maxWidth: 380,
            boxShadow: 'none',
            border: '2px dashed #4cb0b3',
            borderRadius: '12px',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardMedia>
            <Image
              src="/assets/images/prigram1.jfif"
              alt="تقارير تقدم شاملة"
              width={380}
              height={200}
              style={{ objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
            />
          </CardMedia>
          <CardContent sx={{ p: 3, flexGrow: 1 }}>
            <Typography variant="h5" component="h3" sx={{ mb: 1.5, fontWeight: 'bold', color: '#14043c' }}>
              تقارير تقدم شاملة للوالدين
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#495057' }}>
              يمكن للوالدين متابعة تقدم أطفالهم من خلال تقارير مفصلة توضح نقاط القوة والمجالات التي تحتاج إلى تطوير.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Button
        variant="contained"
        sx={{
          mt: { xs: 6, md: 8 },
          backgroundColor: '#14043c',
          color: 'white',
          '&:hover': {
            backgroundColor: '#0c0326',
          },
          px: 4,
          py: 1.5,
          borderRadius: '9999px',
          fontWeight: 'semibold',
          fontSize: '1.125rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        ابدأ رحلة التعلم اليوم
      </Button>
    </Box>
  );
};

export default ProgramComponent;