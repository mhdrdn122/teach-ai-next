// components/Footer.jsx
"use client";

import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTranslations } from 'next-intl';

const Footer = () => {
  
  const t = useTranslations("navbar")
  const t_footer = useTranslations("footer")

const navItems = [
  { name: t("Home"), id: "" },
  { name: t("Program"), id: "program" },
  { name: t("Category"), id: "class" },
  { name: t("Team"), id: "team" },
  // { name: " الاشتراك", id: "subscribe" },
];
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
{t_footer("subTitle")}          </Typography>
        </Box>

        <Box sx={{ mb: { xs: 4, md: 0 } }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
{t_footer("fastLinks")}          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {navItems.map((item) => (
              <Link key={item.id} href={`#${item?.id}`} color="inherit" underline="none" sx={{ '&:hover': { color: '#ff9800' } }}>
                <Typography variant="body2">{item.name}</Typography>
              </Link>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
            {t_footer("span")}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            {socialLinks.map((link, index) => (
              <IconButton key={index} href={link.href} target="_blank" color="inherit" sx={{ '&:hover': { color: '#ff9800' } }}>
                {link.icon}
              </IconButton>
            ))}
          </Box>
          <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255,255,255,0.7)' }}>
            © {new Date().getFullYear()} 
{t_footer("bottomText")}          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;