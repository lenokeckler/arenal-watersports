"use server";

import type { UnitCorrectionInput } from "../models/UnitCorrectionInput.interface";
import type { UnitCorrectionResult } from "../models/UnitCorrectionResult.interface";
import { correctUnitReadings } from "../services/correctUnitReadings";

export const submitUnitCorrection = async (
  input: UnitCorrectionInput
): Promise<UnitCorrectionResult> => {
  const result = await correctUnitReadings(input);

  return result;
};
