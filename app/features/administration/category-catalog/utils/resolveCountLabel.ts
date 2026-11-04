import { LENGTH, STRING } from "@/app/constants";

export const resolveCountLabel = (
  count: number,
  singularNoun: string,
  pluralNoun: string
): string =>
  [
    count,
    count === LENGTH.ONE ? singularNoun : pluralNoun,
  ].join(STRING.SPACE);
