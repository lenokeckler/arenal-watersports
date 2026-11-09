import type { CategoryUnit } from "../models/CategoryUnit.interface";
import {
  DEFAULT_UNIT_OCCUPANCY,
  OCCUPIED_CATEGORY_UNIT,
} from "./CategoryUnits.constants";

export const createOverdueUnit = (
  returnsAt: string
): CategoryUnit => ({
  ...OCCUPIED_CATEGORY_UNIT,
  occupancy: {
    ...DEFAULT_UNIT_OCCUPANCY,
    isOverdue: true,
    returnsAt,
  },
});
