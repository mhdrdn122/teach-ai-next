"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation"; // Updated import for App Router
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormDialog({ mode }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(
    mode != "edit" ? "" : localStorage.getItem("userName") || ""
  );
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName(mode != "edit" ? "" : localStorage.getItem("userName") || ""); // Reset name field on close
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("الرجاء إدخال اسمك.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    try {
      localStorage.setItem("userName", name.trim());
      toast.success("تم حفظ الاسم بنجاح!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        onClose: () => {
          router.push("/teachai"); // Redirect after toast
        },
      });
      handleClose();
    } catch (error) {
      toast.error("حدث خطأ أثناء حفظ الاسم. الرجاء المحاولة مرة أخرى.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      console.error("Local storage error:", error);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          mt: { xs: 0, md: 0 },
          backgroundColor: "#14043c",
          color: "white",
          "&:hover": {
            backgroundColor: "#0c0326",
          },
          px: 2,
          py: 1,
          borderRadius: "9999px",
          fontWeight: "semibold",
          fontSize: "1.0rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        aria-label="اكتشف المزيد"
      >
        {mode == "edit" ? "تعديل الاسم" : " اكتشف المزيد"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        dir="rtl"
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Teach-ai</DialogTitle>
        <DialogContent
          sx={{
            width: "400px",
          }}
        >
          <DialogContentText>يرجى إدخال الاسم</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="الاسم"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleChange}
            inputProps={{ "aria-label": "الاسم" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} aria-label="إغلاق">
            إغلاق
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#14043c",
              "&:hover": {
                backgroundColor: "#0c0326",
              },
            }}
            aria-label="تم"
          >
            تم
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        rtl // Enable RTL for ToastContainer
      />
    </React.Fragment>
  );
}
