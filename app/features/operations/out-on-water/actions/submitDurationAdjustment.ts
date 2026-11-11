"use server";

import type { AdjustDurationInput } from "../models/AdjustDurationInput.interface";
import type { AdjustDurationResult } from "../models/AdjustDurationResult.interface";
import { adjustDispatchDuration } from "../services/adjustDispatchDuration";

export const submitDurationAdjustment = async (
  input: AdjustDurationInput
): Promise<AdjustDurationResult> => {
  const result = await adjustDispatchDuration(input);

  return result;
};
