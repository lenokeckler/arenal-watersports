import type { ExtraFormFieldChangeHandler } from "./ExtraFormFieldChangeHandler.type";

export interface ExtraPriceFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: ExtraFormFieldChangeHandler;
}
