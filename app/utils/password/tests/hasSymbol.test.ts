import { describe, expect, it } from "vitest";
import { PASSWORD_SYMBOLS, STRING } from "@/app/constants";
import { hasSymbol } from "../hasSymbol";
import {
  NON_ASCII_CHARACTERS,
  PASSWORD_WITH_ONLY_LOWERCASE,
  SPACE_CHARACTER,
  SUPABASE_SYMBOLS,
  SYMBOL_EXAMPLE,
} from "./password.constants";

describe("hasSymbol", () => {
  it("matches the symbol set Supabase Auth enforces", () => {
    expect([...PASSWORD_SYMBOLS].sort()).toEqual(
      [...SUPABASE_SYMBOLS].sort()
    );
  });

  it.each(SUPABASE_SYMBOLS)("accepts %s", (symbol) => {
    expect(hasSymbol(symbol)).toBe(true);
  });

  it("finds a symbol among letters", () => {
    expect(
      hasSymbol(
        PASSWORD_WITH_ONLY_LOWERCASE + SYMBOL_EXAMPLE
      )
    ).toBe(true);
  });

  it.each(NON_ASCII_CHARACTERS)(
    "does not count %s",
    (character) => {
      expect(hasSymbol(character)).toBe(false);
    }
  );

  it("does not count a space", () => {
    expect(hasSymbol(SPACE_CHARACTER)).toBe(false);
  });

  it("rejects letters only", () => {
    expect(hasSymbol(PASSWORD_WITH_ONLY_LOWERCASE)).toBe(
      false
    );
  });

  it("rejects an empty password", () => {
    expect(hasSymbol(STRING.Empty)).toBe(false);
  });
});
