import type { NullableRef } from "@/app/types";

export const getNextFuelLevel = (
  currentLevel: NullableRef<number>,
  tappedLine: number
): number =>
  currentLevel === tappedLine ? tappedLine - 1 : tappedLine;
