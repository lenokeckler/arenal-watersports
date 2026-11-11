import type { UnitFormFieldChangeHandler } from "./UnitFormFieldChangeHandler.type";

export interface UnitFieldHandlers {
  onCodeChange: UnitFormFieldChangeHandler;
  onStatusChange: UnitFormFieldChangeHandler;
  onFuelMaxChange: UnitFormFieldChangeHandler;
  onFuelLevelChange: UnitFormFieldChangeHandler;
  onUsageTotalChange: UnitFormFieldChangeHandler;
  onNextOilChangeAtChange: UnitFormFieldChangeHandler;
}
