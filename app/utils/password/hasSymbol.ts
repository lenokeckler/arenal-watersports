import { PASSWORD_SYMBOLS } from "@/app/constants";

export const hasSymbol = (password: string): boolean =>
  Array.from(password).some((character) =>
    PASSWORD_SYMBOLS.includes(character)
  );
