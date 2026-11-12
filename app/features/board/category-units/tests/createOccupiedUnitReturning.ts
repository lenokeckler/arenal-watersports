import type { CategoryUnit } from "../models/CategoryUnit.interface";
import {
  DEFAULT_UNIT_OCCUPANCY,
  OCCUPIED_CATEGORY_UNIT,
} from "./CategoryUnits.constants";

export const createOccupiedUnitReturning = (
  returnsAt: string
): CategoryUnit => ({
  ...OCCUPIED_CATEGORY_UNIT,
  occupancy: { ...DEFAULT_UNIT_OCCUPANCY, returnsAt },
});
