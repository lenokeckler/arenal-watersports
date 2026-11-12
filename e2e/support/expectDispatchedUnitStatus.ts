import { expect } from "@playwright/test";
import { readDispatchedUnitStatus } from "./readDispatchedCancellationState";

export const expectDispatchedUnitStatus = async (
  workerId: string,
  unitCode: string,
  status: string
): Promise<void> => {
  expect(
    await readDispatchedUnitStatus(workerId, unitCode)
  ).toBe(status);
};
