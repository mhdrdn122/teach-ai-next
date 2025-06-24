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

const drawerWidth = 240;
const navItems = ["الرئيسية", "من نحن", "تواصل معنا"];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: "rgba(76,176,179,255)",
        height: "100%",
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        TeachAi
      </Typography>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                "&:hover": { backgroundColor: "rgba(20,4,60,0.1)" },
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              textAlign: "center",
              "&:hover": { backgroundColor: "rgba(20,4,60,0.1)" },
            }}
          >
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
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
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
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontWeight: "bold",
            }}
            className="text-white text-3xl"
          >
            TeachAi
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" }, width: { sm: "80%", md: "60%" } }}>
            <Box sx={{ width: "80%" }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: "#fff",
                    fontSize: "1.125rem",
                    mx: 2,
                    "&:hover": {
                      backgroundColor: "rgba(20,4,60,0.8)",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
            <Button
              sx={{
                color: "#fff",
                fontSize: "1.125rem",
                ml: 4,
                "&:hover": {
                  backgroundColor: "rgba(20,4,60,0.8)",
                },
              }}
            >
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
          sx={{
            backgroundColor: "rgba(76,176,179,255)",
            color: "white",
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
            position: "relative",
            overflow: "hidden",
          }}
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
                sx={{
                  fontSize: { xs: "2.25rem", md: "3rem" },
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                مرحباً بكم في TeachAi
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1.125rem", md: "1.25rem" },
                  lineHeight: "1.6",
                  mb: 3,
                }}
              >
                نؤمن بالدور المحوري للذكاء الاصطناعي في إثراء عملية تعليم
                الأطفال وتطوير مهاراتهم المستقبلية. نقدم حلولاً تعليمية مبتكرة
                تجمع بين المتعة والفعالية.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#14043c",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#0c0326",
                  },
                  px: 4,
                  py: 1.5,
                  borderRadius: "9999px",
                  fontWeight: "semibold",
                  fontSize: "1.125rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
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
          {/* إضافة صورة الغيمة */}
          {/* <img
            src="/assets/images/cloud-h.png"
            alt="Cloud"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "auto",
              zIndex: 1,
              objectFit: "cover",
            }}
          /> */}
        </Box>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;