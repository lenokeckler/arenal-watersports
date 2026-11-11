import { randomInt } from "node:crypto";
import {
  STRING,
  TEMPORARY_PASSWORD,
} from "@/app/constants";

const ALL_CHARACTERS =
  TEMPORARY_PASSWORD.CHARACTER_SETS.join(STRING.Empty);

const pickCharacter = (characters: string): string =>
  characters[randomInt(characters.length)];

const shuffle = (characters: string[]): string[] =>
  characters.reduceRight<string[]>(
    (shuffled, _character, index) => {
      const swapIndex = randomInt(index + 1);
      [shuffled[index], shuffled[swapIndex]] = [
        shuffled[swapIndex],
        shuffled[index],
      ];

      return shuffled;
    },
    [...characters]
  );

export const generateTemporaryPassword = (): string => {
  const oneOfEachSet =
    TEMPORARY_PASSWORD.CHARACTER_SETS.map(pickCharacter);
  const filler = Array.from(
    {
      length:
        TEMPORARY_PASSWORD.LENGTH - oneOfEachSet.length,
    },
    () => pickCharacter(ALL_CHARACTERS)
  );

  return shuffle([...oneOfEachSet, ...filler]).join(
    STRING.Empty
  );
};
