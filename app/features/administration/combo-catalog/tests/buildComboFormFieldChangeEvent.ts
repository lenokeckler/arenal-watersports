import type { ComboFormFieldChangeEvent } from "../models/ComboFormFieldChangeEvent.type";

export const buildComboFormFieldChangeEvent = (
  target: Partial<HTMLInputElement>
): ComboFormFieldChangeEvent =>
  ({ target }) as ComboFormFieldChangeEvent;
