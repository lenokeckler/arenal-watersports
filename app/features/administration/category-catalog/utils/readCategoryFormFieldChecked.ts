import { CategoryFormFieldChangeEvent } from "../models/CategoryFormFieldChangeEvent.type";

export const readCategoryFormFieldChecked = (
  event: CategoryFormFieldChangeEvent
): boolean =>
  "checked" in event.target && event.target.checked;
