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

const drawerWidth = 240;
const navItems = [
  { name: "الرئيسية", id: "" },
  { name: " البرنامج", id: "program" },
  { name: " الفئات", id: "class" },
  { name: " الفريق", id: "team" },
  { name: " الاشتارك", id: "subscribe" },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      className="text-center bg-[rgba(76,176,179,255)] h-full text-white"
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        TeachAi
      </Typography>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              href={`#${item.id}`}
              className="text-center hover:bg-[rgba(20,4,60,0.1)]"
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton className="text-center hover:bg-[rgba(20,4,60,0.1)]">
            <ListItemText primary="تغيير اللغة" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box dir="rtl" sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        elevation={0}
        sx={{ backgroundColor: "rgba(76,176,179,255)", direction: "rtl" }}
      >
        <Toolbar className="justify-between items-center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            className="flex-grow hidden sm:block font-bold text-white text-3xl"
          >
            TeachAi
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              width: { sm: "100%", md: "90%" },
            }}
          >
             <Box sx={{ flex: "1" }} className="justify-center flex">
              {navItems.map((item) => (
                <Button
                  key={item?.name}
                  component={Link}
                  href={`#${item.id}`}
                  sx={{
                    color: "#fff",
                    fontSize: "1.125rem",
                    mx: 1,
                    "&:hover": {
                      backgroundColor: "rgba(20,4,60,0.8)",
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
            <Button sx={{
                    color: "#fff",
                    fontSize: "1.125rem",
                    mx: 1,
                    "&:hover": {
                      backgroundColor: "rgba(20,4,60,0.8)",
                    },
                  }} className="text-white text-lg ml-4 hover:bg-[rgba(20,4,60,0.8)]">
              تغيير اللغة
            </Button>
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
              backgroundColor: "rgba(76,176,179,255)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box
          sx={{ backgroundColor: "rgba(76,176,179,255)" }}
          className="text-white min-h-[calc(100vh-64px)] flex items-center justify-center p-3 relative overflow-hidden bg-[url('/assets/images/bannerbackgrond.png')] bg-cover bg-center"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-8 md:py-0">
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                textAlign: { xs: "center", md: "right" },
                mb: { xs: 8, md: 0 },
                pr: { md: 8 },
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                className="text-4xl md:text-5xl font-bold mb-2"
              >
                مرحباً بكم في TeachAi
              </Typography>
              <Typography
                variant="body1"
                className="text-lg md:text-xl leading-relaxed mb-3"
              >
                نؤمن بالدور المحوري للذكاء الاصطناعي في إثراء عملية تعليم
                الأطفال وتطوير مهاراتهم المستقبلية. نقدم حلولاً تعليمية مبتكرة
                تجمع بين المتعة والفعالية.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                href="teachai"
                className="bg-[#14043c] text-white hover:bg-[#0c0326] px-4 py-1.5 rounded-full font-semibold text-lg shadow-md"
              >
                اكتشف المزيد
              </Button>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                justifyContent: { xs: "center", md: "" },
              }}
            >
              <img
                src="/assets/images/img-hero.png"
                alt="AI in Education"
                className="max-w-full h-auto rounded-lg"
              />
            </Box>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;