import { TYPE_OF } from "@/app/constants";

export const isObjectValue = (
  value: unknown
): value is object =>
  typeof value === TYPE_OF.OBJECT && value !== null;
