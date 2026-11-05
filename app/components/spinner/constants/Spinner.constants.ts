import { LOADING_COPY } from "@/app/constants/strings/LoadingCopy.constants";

export const SPINNER_SIZE = {
  SMALL: "sm",
  MEDIUM: "md",
  LARGE: "lg",
} as const;

export const SPINNER_ARIA = {
  LABEL: LOADING_COPY.LABEL,
  SCREEN_READER_TEXT: LOADING_COPY.TEXT,
  ROLE: "status",
} as const;
