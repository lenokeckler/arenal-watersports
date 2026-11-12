export const readExtraName = (input: unknown): unknown =>
  typeof input === "object" &&
  input !== null &&
  "name" in input
    ? input.name
    : undefined;
