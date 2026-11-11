"use server";

import { getDispatchSheet } from "@/app/services/operations/getDispatchSheet";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";

export const loadDispatchSheet = async (
  reservationId: string
): Promise<DispatchSheetGroup[]> => {
  const groups = await getDispatchSheet(reservationId);

  return groups;
};
