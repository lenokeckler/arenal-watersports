import type { CharacterRange } from "./models/CharacterRange.interface";

export const hasCharacterInRange = (
  text: string,
  range: CharacterRange
): boolean =>
  Array.from(text).some(
    (character) =>
      character >= range.FIRST && character <= range.LAST
  );
