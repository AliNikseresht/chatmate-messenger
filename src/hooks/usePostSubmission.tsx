import { useState } from "react";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

interface PostSubmissionArgs {
  content: string;
  media: {
    file: File | null;
    type: string | null;
  };
  clearForm: () => void;
}

export const usePostSubmission = ({ clearForm }: PostSubmissionArgs) => {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const submitPost = async () => {
    setIsLoading(true);

    try {
      // Placeholder for actual submission logic
      // Example: await api.post('/submit', { content, mediaFile: media.file });

      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false);
        setSnackbar({
          open: true,
          message: "Post created successfully!",
          severity: "success",
        });
        clearForm(); // Clear form upon successful submission
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setSnackbar({
        open: true,
        message: "Failed to create post. Please try again.",
        severity: "error",
      });
    }
  };

  return { isLoading, snackbar, submitPost };
};
