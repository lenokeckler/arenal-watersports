import type { UnitStatus } from "../constants/UnitStatus.constants";
import type { UnitMotorFields } from "./UnitMotorFields.interface";

export interface UnitFields extends UnitMotorFields {
  code: string;
  status: UnitStatus;
}
