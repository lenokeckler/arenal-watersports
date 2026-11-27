import { LENGTH } from "@/app/constants";
import type { ExtraCompatibilityCountRow } from "../models/ExtraCompatibilityCountRow.interface";

export const readCompatibleUnitCount = (
  countRows: ExtraCompatibilityCountRow[]
): number => {
  const [countRow] = countRows;
  return countRow ? countRow.count : LENGTH.ZERO;
};
