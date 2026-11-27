import { STRING } from "@/app/constants";
import { isTextValue } from "./isTextValue";

export const isExtraOccupancyBlank = (
  value: unknown
): boolean =>
  value === undefined ||
  value === null ||
  (isTextValue(value) && value.trim() === STRING.Empty);
