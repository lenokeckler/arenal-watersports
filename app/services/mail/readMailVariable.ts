export const readMailVariable = (name: string): string =>
  process.env[name]?.trim() ?? "";
