import { useState } from "react";

type MediaType = "image" | "audio" | "video";

interface MediaState {
  file: File | null;
  url: string | null;
  type: MediaType | null;
}

export const useMediaUpload = () => {
  const [media, setMedia] = useState<MediaState>({
    file: null,
    url: null,
    type: null,
  });

  const handleMediaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: MediaType
  ) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setMedia({
        file,
        url: URL.createObjectURL(file),
        type,
      });
    }
  };

  const clearMedia = () => {
    if (media.url) URL.revokeObjectURL(media.url);
    setMedia({ file: null, url: null, type: null });
  };

  return { media, handleMediaChange, clearMedia };
};
