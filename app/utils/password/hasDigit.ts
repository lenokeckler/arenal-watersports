import { PASSWORD_CHARACTER_RANGE } from "@/app/constants";
import { hasCharacterInRange } from "./hasCharacterInRange";

export const hasDigit = (password: string): boolean =>
  hasCharacterInRange(
    password,
    PASSWORD_CHARACTER_RANGE.DIGIT
  );
