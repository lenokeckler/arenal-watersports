import type { CategoryFormFieldChangeEvent } from "../models/CategoryFormFieldChangeEvent.type";

export const buildCategoryFormFieldChangeEvent = (
  target: Partial<HTMLInputElement>
): CategoryFormFieldChangeEvent =>
  ({ target }) as CategoryFormFieldChangeEvent;
