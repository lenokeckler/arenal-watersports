import type { ExtraFormFieldChangeEvent } from "../models/ExtraFormFieldChangeEvent.type";

export const buildExtraFormFieldChangeEvent = (
  target: Partial<HTMLInputElement>
): ExtraFormFieldChangeEvent =>
  ({ target }) as ExtraFormFieldChangeEvent;
