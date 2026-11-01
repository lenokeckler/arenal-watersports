import type { UnitFormFieldChangeEvent } from "../models/UnitFormFieldChangeEvent.type";

export const buildUnitFormFieldChangeEvent = (
  target: Partial<HTMLInputElement>
): UnitFormFieldChangeEvent =>
  ({ target }) as UnitFormFieldChangeEvent;
