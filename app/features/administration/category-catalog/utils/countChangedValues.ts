import type { CategoryEditedValues } from "../models/CategoryEditedValues.interface";

const countChangedKeys = <Values extends object>(
  baseline: Values,
  current: Values
): number =>
  Object.entries(current).filter(
    ([fieldName, value]) =>
      value !== Reflect.get(baseline, fieldName)
  ).length;

export const countChangedValues = (
  baseline: CategoryEditedValues,
  current: CategoryEditedValues
): number =>
  countChangedKeys(baseline.behavior, current.behavior) +
  countChangedKeys(baseline.deposit, current.deposit) +
  countChangedKeys(baseline.alerts, current.alerts);
