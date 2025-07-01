"use client";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import FormDialog from "./FormDialog";
import LocaleSwitcher from "../components/LocaleSwitcher";
import { useTranslations } from "next-intl";

const drawerWidth = 280;

function DrawerAppBar(props) {
  const t = useTranslations("navbar");
  const t_hero = useTranslations("hero");

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const navItems = [
    { name: t("Home"), id: "" },
    { name: t("Program"), id: "program" },
    { name: t("Category"), id: "class" },
    { name: t("Team"), id: "team" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      className="h-full bg-gradient-to-b from-teal-600 to-teal-500 text-white"
    >
      <Typography 
        variant="h6" 
        sx={{ 
          my: 2,
          px: 2,
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        TeachAi
      </Typography>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              href={`#${item.id}`}
              sx={{
                textAlign: 'center',
                py: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  transform: 'translateX(5px)'
                }
              }}
            >
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{
                  fontSize: '1.1rem',
                  fontWeight: 'medium'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton 
            sx={{
              textAlign: 'center',
              py: 1.5,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
                transform: 'translateX(5px)'
              }
            }}
          >
            <LocaleSwitcher />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        elevation={0}
        sx={{ 
          backgroundColor: "rgba(76,176,179,1)",
          backgroundImage: 'linear-gradient(to right, rgba(76,176,179,1), rgba(56,156,159,1))',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar className="justify-between items-center max-w-7xl mx-auto w-full">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: "none" },
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: { xs: 1, sm: 0 },
              display: 'block',
              fontFamily: 'inherit',
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              letterSpacing: '0.5px'
            }}
          >
            TeachAi
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: 'center',
              gap: { sm: 1, md: 2 },
              flex: { sm: 1, md: 'none' },
              justifyContent: 'center',
              ml: { sm: 2, md: 0 }
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item?.name}
                component={Link}
                href={`#${item.id}`}
                sx={{
                  color: "#fff",
                  fontSize: { sm: '0.9rem', md: '1rem', lg: '1.1rem' },
                  px: { sm: 1, md: 2 },
                  py: 1.5,
                  fontWeight: 'medium',
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '&::after': {
                      width: '100%'
                    }
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '8px',
                    left: '0',
                    width: '0',
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease'
                  }
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          
          <Box sx={{ 
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            gap: 1
          }}>
            <LocaleSwitcher />
          </Box>
        </Toolbar>
      </AppBar>
      
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundImage: 'linear-gradient(to bottom, rgba(76,176,179,1), rgba(56,156,159,1))',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box
          sx={{ 
            backgroundImage: 'linear-gradient(135deg, rgba(76,176,179,1) 0%, rgba(56,156,159,1) 100%)',
            minHeight: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 70px)' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 4, md: 0 },
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '100%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              transform: 'rotate(30deg)'
            }
          }}
        >
          <Box 
            sx={{ 
              maxWidth: '1400px',
              width: '100%',
              mx: 'auto',
              px: { xs: 2, sm: 4, md: 6 },
              py: { xs: 4, md: 8 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 4, md: 8 },
              position: 'relative',
              zIndex: 1
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                textAlign: { xs: "center", md: "left" },
                color: 'white',
                animation: 'fadeInUp 0.8s ease'
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 'bold',
                  lineHeight: 1.2,
                  mb: 2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
              >
                {t_hero("title")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.2rem', lg: '1.3rem' },
                  lineHeight: 1.6,
                  mb: 3,
                  maxWidth: '600px',
                  mx: { xs: 'auto', md: '0' }
                }}
              >
                {t_hero("description")}
              </Typography>
              
              <Box sx={{ 
                mt: 4,
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <FormDialog />
              </Box>
            </Box>
            
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: 'relative',
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  transform: { xs: 'none', md: 'translateY(0)' },
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: { xs: 'none', md: 'translateY(-10px)' }
                  }
                }
              }}
            >
              <img
                src="/assets/images/img-hero.png"
                alt="AI in Education"
                className="hero-image"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;