"use server";

import type { CloseGroupInput } from "../models/CloseGroupInput.interface";
import type { CloseGroupResult } from "../models/CloseGroupResult.interface";
import { closeDispatchGroup } from "../services/closeDispatchGroup";

export const submitGroupClosing = async (
  input: CloseGroupInput
): Promise<CloseGroupResult> => {
  const result = await closeDispatchGroup(input);

  return result;
};
