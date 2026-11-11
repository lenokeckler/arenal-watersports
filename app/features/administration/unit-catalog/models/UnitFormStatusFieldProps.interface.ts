import type { UnitStatus } from "../constants/UnitStatus.constants";
import type { UnitFormFieldChangeHandler } from "./UnitFormFieldChangeHandler.type";

export interface UnitFormStatusFieldProps {
  value: UnitStatus;
  disabled: boolean;
  onChange: UnitFormFieldChangeHandler;
}
