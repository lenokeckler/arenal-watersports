"use server";

import type { BoardUnitUpdateResult } from "../models/BoardUnitUpdateResult.interface";
import type { OpenDispatchUpdateInput } from "../models/OpenDispatchUpdateInput.interface";
import { updateOpenDispatch } from "../services/updateOpenDispatch";

export const submitOpenDispatchUpdate = async (
  input: OpenDispatchUpdateInput
): Promise<BoardUnitUpdateResult> => {
  const result = await updateOpenDispatch(input);

  return result;
};
