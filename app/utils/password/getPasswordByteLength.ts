export const getPasswordByteLength = (
  password: string
): number => new TextEncoder().encode(password).length;
