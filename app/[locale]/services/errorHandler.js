import { toast } from "react-toastify";

const handleError = (error, message) => {
  console.error(message, error);
  toast.error(message);
};

export default handleError;