"use server";

import type { BoardUnitMaintenanceInput } from "../models/BoardUnitMaintenanceInput.interface";
import type { BoardUnitUpdateResult } from "../models/BoardUnitUpdateResult.interface";
import { setBoardUnitMaintenance } from "../services/setBoardUnitMaintenance";

export const submitBoardUnitMaintenance = async (
  input: BoardUnitMaintenanceInput
): Promise<BoardUnitUpdateResult> => {
  const result = await setBoardUnitMaintenance(input);

  return result;
};
