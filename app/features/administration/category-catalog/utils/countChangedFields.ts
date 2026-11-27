import type { CategoryConfigureDraftComparison } from "../models/CategoryConfigureDraftComparison.interface";
import { countChangedValues } from "./countChangedValues";

export const countChangedFields = ({
  baseline,
  current,
}: CategoryConfigureDraftComparison): number =>
  countChangedValues(baseline.values, current.values) +
  Number(current.pickedFile !== baseline.pickedFile) +
  Number(current.isActive !== baseline.isActive);
