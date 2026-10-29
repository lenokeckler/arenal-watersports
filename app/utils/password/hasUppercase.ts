import { PASSWORD_CHARACTER_RANGE } from "@/app/constants";
import { hasCharacterInRange } from "./hasCharacterInRange";

export const hasUppercase = (password: string): boolean =>
  hasCharacterInRange(
    password,
    PASSWORD_CHARACTER_RANGE.UPPERCASE
  );
