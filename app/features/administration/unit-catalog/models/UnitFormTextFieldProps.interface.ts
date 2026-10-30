import type { InputMode } from "@/app/components/form-field/constants/InputTypes.constants";
import type { UnitFormFieldChangeHandler } from "./UnitFormFieldChangeHandler.type";

export interface UnitFormTextFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  inputMode?: InputMode;
  disabled: boolean;
  onChange: UnitFormFieldChangeHandler;
}
