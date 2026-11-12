import type { UnitFormMode } from "../constants/UnitFormMode.constants";
import type { Unit } from "./Unit.interface";
import type { UnitCategory } from "./UnitCategory.interface";

export interface UnitFormViewModelProps {
  mode: UnitFormMode;
  category: UnitCategory;
  unit?: Unit;
}
