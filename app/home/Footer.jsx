// components/Footer.jsx
"use client";

import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const navItems = ['الرئيسية', 'من نحن', 'البرنامج', 'المدربون', 'المدونة', 'تواصل معنا'];
   
  const socialLinks = [
    { icon: <FacebookIcon />, href: '#' },
    { icon: <TwitterIcon />, href: '#' },
    { icon: <InstagramIcon />, href: '#' },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        backgroundColor: '#14043c', 
        color: 'white',
        textAlign: { xs: 'center', md: 'right' },
        position: 'relative',
        overflow: 'hidden',
      }}
      dir="rtl"
    >
      <Box
        className="container mx-auto"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'space-between',
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            flex: { md: 1 },
            textAlign: { xs: 'center', md: 'right' },
            mb: { xs: 4, md: 0 },
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              mb: 1.5,
              color: 'white',
            }}
          >
            TeachAi
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: '300px', lineHeight: 1.6, mx: { xs: 'auto', md: 'unset' } }}>
            نقدم حلولاً تعليمية مبتكرة تجمع بين المتعة والفعالية لتنمية مهارات أطفالكم.
          </Typography>
        </Box>

        <Box sx={{ mb: { xs: 4, md: 0 } }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
            روابط سريعة
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {navItems.map((item) => (
              <Link key={item} href="#" color="inherit" underline="none" sx={{ '&:hover': { color: '#ff9800' } }}>
                <Typography variant="body2">{item}</Typography>
              </Link>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
            تابعنا
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            {socialLinks.map((link, index) => (
              <IconButton key={index} href={link.href} target="_blank" color="inherit" sx={{ '&:hover': { color: '#ff9800' } }}>
                {link.icon}
              </IconButton>
            ))}
          </Box>
          <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255,255,255,0.7)' }}>
            © {new Date().getFullYear()} TeachAi. جميع الحقوق محفوظة.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;