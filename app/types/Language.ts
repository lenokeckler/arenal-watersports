import { LANGUAGE } from "@/app/constants/language/Language.constants";

export type Language =
  (typeof LANGUAGE)[keyof typeof LANGUAGE];
