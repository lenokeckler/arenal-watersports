import { STRING } from "@/app/constants";

export const safeString = (
  value: string | null | undefined
): string =>
  typeof value === "string" ? value : STRING.Empty;

export const safeNumber = (
  value: number | null | undefined
): number => (typeof value === "number" ? value : 0);

export const safeObject = (
  value: object | undefined
): object => (typeof value === "object" ? value : []);
export const safePlainObject = (
  value: object | undefined | null
): object =>
  value &&
  typeof value === "object" &&
  !Array.isArray(value)
    ? value
    : {};
