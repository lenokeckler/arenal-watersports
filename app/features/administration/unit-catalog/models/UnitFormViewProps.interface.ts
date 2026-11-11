import type { UnitFormMode } from "../constants/UnitFormMode.constants";
import type { Unit } from "./Unit.interface";
import type { UnitCategory } from "./UnitCategory.interface";

export interface UnitFormViewProps {
  children?: React.ReactNode;
  mode: UnitFormMode;
  category: UnitCategory;
  unit?: Unit;
}
