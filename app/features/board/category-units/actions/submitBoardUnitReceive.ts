"use server";

import type { BoardUnitReceiveInput } from "../models/BoardUnitReceiveInput.interface";
import type { BoardUnitUpdateResult } from "../models/BoardUnitUpdateResult.interface";
import { receiveBoardUnit } from "../services/receiveBoardUnit";

export const submitBoardUnitReceive = async (
  input: BoardUnitReceiveInput
): Promise<BoardUnitUpdateResult> => {
  const result = await receiveBoardUnit(input);

  return result;
};
