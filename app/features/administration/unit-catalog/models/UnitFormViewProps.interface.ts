import type { UnitFormMode } from "../constants/UnitFormMode.constants";
import type { UnitCategory } from "./UnitCategory.interface";

export interface UnitFormViewProps {
  mode: UnitFormMode;
  category: UnitCategory;
}
