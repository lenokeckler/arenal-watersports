import type { CLOSE_GROUP_PHASE } from "../constants/CloseGroup.constants";
import type { GroupReturnUnit } from "./GroupReturnUnit.interface";

export interface GroupReturnUnitsState {
  phase: (typeof CLOSE_GROUP_PHASE)[keyof typeof CLOSE_GROUP_PHASE];
  units: GroupReturnUnit[];
}
