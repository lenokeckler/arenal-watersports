import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { toFiniteNumberOrNull } from "./toFiniteNumberOrNull";

export const parseCategoryAlertNumber = (
  text: string
): NullableRef<number> => {
  const trimmedText = text.trim();
  return trimmedText === STRING.Empty
    ? null
    : toFiniteNumberOrNull(Number(trimmedText));
};
