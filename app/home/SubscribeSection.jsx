// components/SubscribeSection.jsx
"use client";

import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Image from 'next/image';

const SubscribeSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        backgroundColor: '#9c27b0', // لون بنفسجي داكن مشابه للتصميم
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="container mx-auto"
      dir="rtl"
    >
      {/* صور متناثرة */}
      <Image
        src="/assets/images/decorative/star-icon.png"
        alt="Star"
        width={40}
        height={40}
        style={{ position: 'absolute', top: '15%', left: '10%', zIndex: 0, animation: 'spin 15s linear infinite' }}
      />
      <Image
        src="/assets/images/decorative/rocket-icon.png"
        alt="Rocket"
        width={70}
        height={70}
        style={{ position: 'absolute', top: '25%', right: '8%', zIndex: 0, transform: 'rotate(25deg)' }}
      />
      <Image
        src="/assets/images/decorative/candy-icon.png"
        alt="Candy"
        width={50}
        height={50}
        style={{ position: 'absolute', bottom: '10%', left: '20%', zIndex: 0, transform: 'rotate(-10deg)' }}
      />
      <Image
        src="/assets/images/decorative/cloud-bottom.png"
        alt="Cloud"
        width={100}
        height={60}
        style={{ position: 'absolute', bottom: '5%', right: '15%', zIndex: 0, transform: 'rotate(5deg)' }}
      />
      <Image
        src="/assets/images/decorative/star-icon.png"
        alt="Star"
        width={30}
        height={30}
        style={{ position: 'absolute', bottom: '30%', right: '5%', zIndex: 0, animation: 'spin 10s linear infinite reverse' }}
      />

      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 2,
          fontWeight: 'bold',
          fontSize: { xs: '2rem', md: '3rem' },
          color: 'white',
          zIndex: 1, // تأكد من أن النص فوق الصور المتناثرة
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
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // خلفية شفافة قليلاً
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)', // لون الحدود
              },
              '&:hover fieldset': {
                borderColor: 'white', // لون الحدود عند التمرير
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // لون الحدود عند التركيز
              },
            },
            '& .MuiInputBase-input': {
              color: 'white', // لون النص المدخل
            },
            '& .MuiInputLabel-root': {
                color: 'white', // لون Placeholder
            },
            '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)', // لون Placeholder
                opacity: 1, // Make sure placeholder is not too transparent
            },
            direction: 'rtl', // للحفاظ على اتجاه الكتابة من اليمين لليسار
            textAlign: 'right', // لمحاذاة النص في حقل الإدخال
          }}
          InputProps={{ // Ensure placeholder and input direction are correct
            style: { color: 'white' },
            inputProps: {
                dir: 'rtl',
                textAlign: 'right'
            }
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff9800', // لون برتقالي مميز للزر
            color: 'white',
            '&:hover': {
              backgroundColor: '#e68900', // لون أغمق عند التمرير
            },
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            minWidth: { xs: '100%', sm: '150px' }, // عرض مستجيب للزر
          }}
        >
          اشترك الآن
        </Button>
      </Box>

      {/* صورة الأطفال في الأسفل على اليمين */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        right: { xs: 0, sm: '5%' }, // على اليمين
        width: { xs: '100%', sm: 'auto' },
        height: 'auto',
        zIndex: 1, // فوق الصور المتناثرة ولكن تحت النص
        display: 'flex',
        justifyContent: 'flex-end', // لمحاذاة الصورة إلى اليمين
      }}>
        <Image
          src="/assets/images/subscribe-kids.png" // تأكد من مسار هذه الصورة
          alt="Kids reading"
          width={400} // يمكن تعديل العرض
          height={300} // يمكن تعديل الارتفاع
          style={{ objectFit: 'contain', maxWidth: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default SubscribeSection;