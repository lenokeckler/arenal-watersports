import { vi } from "vitest";
import { createOperationsClient } from "@/app/components/dispatch-board/tests/getPendingDispatchReservations.test-utils";
import { describe, expect, it } from "vitest";
import {
  MAINTENANCE_JOB_DATABASE_ERROR,
  MAINTENANCE_JOB_STATUS,
} from "../constants/MaintenanceJob.constants";
import { getMaintenanceJobUnits } from "../services/getMaintenanceJobUnits";
import { registerMaintenanceJob } from "../services/registerMaintenanceJob";
import {
  INVALID_JOB_INPUTS,
  JOB_INPUT_FIXTURE,
  JOB_RPC_ARGS,
  JOB_UNIT,
  JOB_UNIT_ROW,
} from "./MaintenanceJob.constants";

type Rpc = ReturnType<typeof createOperationsClient>["rpc"];

const queueAnswer = (
  rpc: Rpc,
  error: { code: string; message: string } | null
) => {
  rpc.mockReset();
  rpc.mockResolvedValueOnce({ data: true, error: null });
  rpc.mockResolvedValueOnce({ data: null, error });
};

describe("registerMaintenanceJob", () => {
  it("sends the job with its cost, its currency and who did it", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, null);

    await expect(
      registerMaintenanceJob(JOB_INPUT_FIXTURE)
    ).resolves.toEqual({
      status: MAINTENANCE_JOB_STATUS.REGISTERED,
    });
    expect(rpc).toHaveBeenLastCalledWith(
      "register_maintenance_job",
      JOB_RPC_ARGS
    );
  });

  it.each([
    [
      MAINTENANCE_JOB_DATABASE_ERROR.UNIT_RETIRED,
      MAINTENANCE_JOB_STATUS.UNIT_RETIRED,
    ],
    [
      MAINTENANCE_JOB_DATABASE_ERROR.INVALID_JOB,
      MAINTENANCE_JOB_STATUS.INVALID,
    ],
    [
      MAINTENANCE_JOB_DATABASE_ERROR.INVALID_VALUE,
      MAINTENANCE_JOB_STATUS.INVALID,
    ],
  ])("answers %s as %s", async (code, status) => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, { code, message: "refused" });

    await expect(
      registerMaintenanceJob(JOB_INPUT_FIXTURE)
    ).resolves.toEqual({ status });
  });

  it("raises any other database error", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, { code: "XX000", message: "boom" });

    await expect(
      registerMaintenanceJob(JOB_INPUT_FIXTURE)
    ).rejects.toThrow();
  });

  it.each(INVALID_JOB_INPUTS)(
    "refuses $name before touching the database",
    async ({ input }) => {
      const { rpc } = createOperationsClient(true, true);
      rpc.mockClear();

      await expect(
        registerMaintenanceJob(input)
      ).rejects.toBeInstanceOf(RangeError);
      expect(rpc).not.toHaveBeenCalled();
    }
  );
});

describe("getMaintenanceJobUnits", () => {
  it("reads the units that can take a job with their usage", async () => {
    const { client } = createOperationsClient(true, true);
    const limit = vi.fn().mockResolvedValue({
      data: [JOB_UNIT_ROW],
      error: null,
    });
    const order = vi.fn().mockReturnValue({ limit });
    const neq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ neq });
    Object.assign(client, {
      from: vi.fn().mockReturnValue({ select }),
    });

    await expect(getMaintenanceJobUnits()).resolves.toEqual(
      [JOB_UNIT]
    );
    expect(neq).toHaveBeenCalledWith(
      "status",
      "decommissioned"
    );
  });
});
