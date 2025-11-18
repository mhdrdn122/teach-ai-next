"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocale, useTranslations } from "next-intl";

export default function FormDialog({ mode }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(
    mode !== "edit" ? "" : localStorage.getItem("userName") || ""
  );
  const t = useTranslations("formDialog");
  const lang = useLocale();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName(mode !== "edit" ? "" : localStorage.getItem("userName") || "");
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error(t("errorNameRequired"), {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        rtl: lang === "ar",
      });
      return;
    }

    try {
      localStorage.setItem("userName", name.trim());
      toast.success(t("successNameSaved"), {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        rtl: lang === "ar",
        onClose: () => {
          router.push("/teachai");
        },
      });
      handleClose();
    } catch (error) {
      toast.error(t("errorSavingName"), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        rtl: lang === "ar",
      });
      console.error("Local storage error:", error);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#4cb0b3",
          color: "white",
          "&:hover": {
            backgroundColor: "#389c9f",
          },
          px: 3,
          py: 1.5,
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1rem",
          boxShadow: "0 2px 8px rgba(76, 176, 179, 0.3)",
          textTransform: "none",
          minWidth: "150px",
        }}
        // aria-label={mode === "edit" ? t("editName") : t("discoverMore")}
      >
        {mode === "edit" ? t("btnTextEditName") : t("btnText")}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          sx: {
            borderRadius: "12px",
            direction: lang === "ar" ? "rtl" : "ltr",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#4cb0b3",

            color: "white",
            fontSize: "1.25rem",
            fontWeight: "bold",
            py: 2,
            mb:2
            
          }}
        >
          TeachAi
        </DialogTitle>

        <DialogContent sx={{ py: 3  }}>
          <DialogContentText sx={{ mb: 3, color: "#495057" }}>
            {t("contentDialog")}
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label={t("labelField")}
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={handleChange}
            inputProps={{
              "aria-label": t("labelField"),
              style: {
                borderRadius: "8px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              color: "#495057",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {t("btnTextClose")}
          </Button>

          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#4cb0b3",
              color: "white",
              borderRadius: "8px",
              px: 3,
              "&:hover": {
                backgroundColor: "#389c9f",
              },
            }}
          >
            {t("btnTextConfirm")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        rtl={lang === "ar"}
      /> */}
    </React.Fragment>
  );
}
