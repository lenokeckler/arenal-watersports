import { TYPE_OF } from "@/app/constants";

export const isTextValue = (
  value: unknown
): value is string => typeof value === TYPE_OF.STRING;
