"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const CommitmentSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        backgroundColor: '#ffffff',
        color: '#14043c',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 6, md: 8 },
      }}
      className="container mx-auto"
      dir="rtl"
    >
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: 'center', md: 'right' },
          maxWidth: { xs: '100%', md: '50%' },
          pr: { md: 4 },
        }}
      >
        <Typography
          variant="h4"
          component="h3"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '2.8rem' },
            lineHeight: 1.2,
          }}
        >
          نحن ملتزمون بتعليم جميع طلابنا
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.7,
            color: '#495057',
          }}
        >
          نؤمن بأن التعليم عالي الجودة حق للجميع. في TeachAi، نكرس جهودنا لتوفير بيئة تعليمية شاملة وداعمة حيث يمكن لكل طفل أن يزدهر ويتطور. نعمل على تلبية الاحتياجات الفردية لكل متعلم، مع التركيز على بناء الثقة وتعزيز حب التعلم مدى الحياة.
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: { xs: 'center', md: 'left' },
          maxWidth: { xs: '100%', md: '50%' },
        }}
      >
        <Image
          src="/assets/images/img-hero.png"
          alt="Kid with glasses smiling"
          width={450}
          height={450}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Box>
    </Box>
  );
};

export default CommitmentSection;