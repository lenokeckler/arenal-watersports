"use server";

import type { BoardUnitCorrectionInput } from "../models/BoardUnitCorrectionInput.interface";
import type { BoardUnitUpdateResult } from "../models/BoardUnitUpdateResult.interface";
import { correctBoardUnit } from "../services/correctBoardUnit";

export const submitBoardUnitCorrection = async (
  input: BoardUnitCorrectionInput
): Promise<BoardUnitUpdateResult> => {
  const result = await correctBoardUnit(input);

  return result;
};
