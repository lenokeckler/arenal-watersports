import type { ExtraFormFieldChangeEvent } from "../models/ExtraFormFieldChangeEvent.type";

export const readExtraToggleChecked = ({
  target,
}: ExtraFormFieldChangeEvent): boolean =>
  "checked" in target && target.checked;
