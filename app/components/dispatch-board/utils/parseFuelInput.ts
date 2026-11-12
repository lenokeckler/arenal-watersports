import type { NullableRef } from "@/app/types";
import { DISPATCH_READING_PATTERN } from "../constants/DispatchSheet.constants";

export const parseFuelInput = (
  text: string,
  max: number
): NullableRef<number> => {
  const trimmed = text.trim();

  if (!DISPATCH_READING_PATTERN.FUEL.test(trimmed)) {
    return null;
  }

  const level = Number(trimmed);

  return level <= max ? level : null;
};
