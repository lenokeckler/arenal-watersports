import { PASSWORD_CHARACTER_RANGE } from "@/app/constants";
import { hasCharacterInRange } from "./hasCharacterInRange";

export const hasLowercase = (password: string): boolean =>
  hasCharacterInRange(
    password,
    PASSWORD_CHARACTER_RANGE.LOWERCASE
  );
