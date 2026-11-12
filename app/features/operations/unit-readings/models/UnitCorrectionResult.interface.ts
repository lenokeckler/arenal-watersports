import type { UNIT_READINGS_RESULT } from "../constants/UnitReadings.constants";

export interface UnitCorrectionResult {
  status: (typeof UNIT_READINGS_RESULT)[keyof typeof UNIT_READINGS_RESULT];
}
