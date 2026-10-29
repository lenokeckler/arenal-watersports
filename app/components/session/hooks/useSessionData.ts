import { SESSION_TIMEOUT_WARNING_MODAL } from "@/app/constants";
import { useLanguage } from "@/app/store/useLanguage";
import { SessionData } from "../models/SessionData.interface";

export const useSessionData = (): SessionData => {
  const { language, setLanguage } = useLanguage();

  return {
    title: SESSION_TIMEOUT_WARNING_MODAL.TITLE,
    description: SESSION_TIMEOUT_WARNING_MODAL.MESSAGE,
    minute: SESSION_TIMEOUT_WARNING_MODAL.MESSAGE_MINUTES,
    logout: SESSION_TIMEOUT_WARNING_MODAL.CONFIRM_TEXT,
    keep_session: SESSION_TIMEOUT_WARNING_MODAL.CANCEL_TEXT,
    language,
    setLanguage,
  };
};
