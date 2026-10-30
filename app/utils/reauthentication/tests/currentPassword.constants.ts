import { PASSWORD_LENGTH } from "@/app/constants";

const FILLER = "a";

export const VALID_CURRENT_PASSWORD = "Clave-actual-1!";
export const CURRENT_PASSWORD_ONE_CHARACTER_ABOVE_MAX =
  FILLER.repeat(PASSWORD_LENGTH.MAX + 1);
