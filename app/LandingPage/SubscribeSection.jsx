// components/SubscribeSection.jsx
"use client";

import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Image from 'next/image';

const SubscribeSection = () => {
  return (
    <Box
      id="subscribe"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        backgroundColor: '#9c27b0',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className=" mx-auto"
      dir="rtl"
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 2,
          fontWeight: 'bold',
          fontSize: { xs: '2rem', md: '3rem' },
          color: 'white',
          zIndex: 1,
        }}
      >
        اشترك معنا
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: { xs: 4, md: 6 },
          mx: 'auto',
          maxWidth: '600px',
          fontSize: { xs: '1rem', md: '1.15rem' },
          lineHeight: 1.7,
          color: 'white',
          zIndex: 1,
        }}
      >
        اشترك لتلقي أحدث المواد التعليمية، نصائح للوالدين، وتحديثات حول برامجنا الجديدة مباشرة إلى بريدك الإلكتروني!
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          width: { xs: '100%', sm: 'auto' },
          maxWidth: '500px',
          zIndex: 1,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="أدخل بريدك الإلكتروني"
          sx={{
            flexGrow: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
                color: 'white',
            },
            '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1,
            },
            direction: 'rtl',
          }}
          InputProps={{
            style: { color: 'white' },
            // inputProps: {
            //   dir: 'rtl',
            //   textAlign: 'right'
            // }
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff9800',
            color: 'white',
            '&:hover': {
              backgroundColor: '#e68900',
            },
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            minWidth: { xs: '100%', sm: '150px' },
          }}
        >
          اشترك الآن
        </Button>
      </Box>

      <Box sx={{
        position: 'absolute',
        bottom: 0,
        right: { xs: 0, sm: '2%' },
        width: { xs: '100%', sm: 'auto' },
        height: 'auto',
        zIndex: 1,
        display: { xs: 'none', md: 'flex' },
        justifyContent: 'flex-end',
      }}>
        <Image
          src="/assets/images/img-hero.png"
          alt="Kids reading"
          width={350}
          height={300}
          style={{ objectFit: 'contain', maxWidth: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default SubscribeSection;