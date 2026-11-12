import { createOperationsClient } from "@/app/components/dispatch-board/tests/getPendingDispatchReservations.test-utils";
import { describe, expect, it } from "vitest";
import {
  ADJUST_DURATION_STATUS,
  OUT_ON_WATER_DATABASE_ERROR,
} from "../constants/OutOnWater.constants";
import { adjustDispatchDuration } from "../services/adjustDispatchDuration";
import {
  ADJUST_INPUT_FIXTURE,
  INVALID_ADJUST_INPUTS,
} from "./OutOnWater.constants";

const queueAnswer = (
  rpc: ReturnType<typeof createOperationsClient>["rpc"],
  error: { code: string; message: string } | null
) => {
  rpc.mockReset();
  rpc.mockResolvedValueOnce({ data: true, error: null });
  rpc.mockResolvedValueOnce({ data: null, error });
};

describe("adjustDispatchDuration", () => {
  it("sends the new duration of the group", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, null);

    await expect(
      adjustDispatchDuration(ADJUST_INPUT_FIXTURE)
    ).resolves.toEqual({
      status: ADJUST_DURATION_STATUS.ADJUSTED,
    });
    expect(rpc).toHaveBeenLastCalledWith(
      "adjust_dispatch_duration",
      {
        p_dispatch_id: ADJUST_INPUT_FIXTURE.dispatchId,
        p_duration_minutes:
          ADJUST_INPUT_FIXTURE.durationMinutes,
      }
    );
  });

  it("answers that the group already came back", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, {
      code: OUT_ON_WATER_DATABASE_ERROR.ALREADY_CLOSED,
      message: "closed",
    });

    await expect(
      adjustDispatchDuration(ADJUST_INPUT_FIXTURE)
    ).resolves.toEqual({
      status: ADJUST_DURATION_STATUS.ALREADY_CLOSED,
    });
  });

  it("answers that the duration is not valid", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, {
      code: OUT_ON_WATER_DATABASE_ERROR.INVALID_DURATION,
      message: "invalid",
    });

    await expect(
      adjustDispatchDuration(ADJUST_INPUT_FIXTURE)
    ).resolves.toEqual({
      status: ADJUST_DURATION_STATUS.INVALID,
    });
  });

  it("raises any other database error", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, { code: "XX000", message: "boom" });

    await expect(
      adjustDispatchDuration(ADJUST_INPUT_FIXTURE)
    ).rejects.toThrow();
  });

  it.each(INVALID_ADJUST_INPUTS)(
    "refuses $name before touching the database",
    async ({ input }) => {
      const { rpc } = createOperationsClient(true, true);
      rpc.mockClear();

      await expect(
        adjustDispatchDuration(input)
      ).rejects.toBeInstanceOf(RangeError);
      expect(rpc).not.toHaveBeenCalled();
    }
  );
});
