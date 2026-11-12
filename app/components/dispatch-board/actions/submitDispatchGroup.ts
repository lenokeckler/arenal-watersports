"use server";

import { dispatchReservationGroup } from "@/app/services/operations/dispatchReservationGroup";
import type { DispatchGroupInput } from "../models/DispatchGroupInput.interface";
import type { DispatchGroupResult } from "../models/DispatchGroupResult.interface";

export const submitDispatchGroup = async (
  input: DispatchGroupInput
): Promise<DispatchGroupResult> => {
  const result = await dispatchReservationGroup(input);

  return result;
};
