"use server";

import type { GroupReturnUnit } from "../models/GroupReturnUnit.interface";
import { getGroupReturnUnits } from "../services/getGroupReturnUnits";

export const loadGroupReturnUnits = async (
  dispatchId: string
): Promise<GroupReturnUnit[]> => {
  const units = await getGroupReturnUnits(dispatchId);

  return units;
};
