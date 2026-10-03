import { STRING, USERNAME } from "@/app/constants";
import { normalizeUsername } from "./normalizeUsername";

export const toAuthEmail = (username: string): string =>
  `${normalizeUsername(username)}${STRING.AT}${USERNAME.AUTH_EMAIL_DOMAIN}`;
