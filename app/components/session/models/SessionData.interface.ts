import { Language } from "@/app/types";

export interface SessionData {
  title: string;
  description: string;
  minute: string;
  logout: string;
  keep_session: string;
  setLanguage: (_language: Language) => void;
  language: Language;
}
