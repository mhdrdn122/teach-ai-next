import { Stack, Chip, Typography, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";

const ResultDisplay = ({ loadingAnswer , loadingQuestion , userAnswer, answerResult, correctAnswer }) => {
  const t = useTranslations("teach-ai");
  
 
  if ( loadingAnswer ) {
    return (
      <Typography className="text-lg text-gray-800 flex justify-center items-center gap-4 font-medium">
        <CircularProgress size={30} sx={{ color: "#1a9de6" }} />
        {t("loading-answer")}
      </Typography>
    );
  }

  if (userAnswer && !loadingAnswer) {
    return (
      <Stack
        direction={{ xs: "column", sm: "row-reverse" }}
        spacing={2}
        alignItems={{ xs: "center", sm: "flex-start" }}
        justifyContent="center"
        gap="10px"
        className="w-full"
      >
        <Chip
          label={`${t("answer2")}: ${userAnswer}`}
          color="primary"
          sx={{ fontSize: { xs: 16, sm: 20 }, padding: { xs: 2, sm: 4 }, minWidth: { xs: "80%", sm: "auto" }, textAlign: "center", height: "auto" }}
          className="shadow-md"
        />
        <Chip
          label={`${t("result-answer")}: ${answerResult}`}
          color={answerResult === t("correct") ? "success" : "error"}
          sx={{ fontSize: { xs: 16, sm: 20 }, padding: { xs: 2, sm: 4 }, minWidth: { xs: "80%", sm: "auto" }, textAlign: "center", height: "auto" }}
          className="shadow-md"
        />
        <Chip
          label={`${t("right-answer")} ${correctAnswer}`}
          color="success"
          sx={{ fontSize: { xs: 16, sm: 20 }, padding: { xs: 2, sm: 4 }, minWidth: { xs: "80%", sm: "auto" }, textAlign: "center", height: "auto" }}
          className="shadow-md"
        />
      </Stack>
    );
  }

  return null;
};

export default ResultDisplay;