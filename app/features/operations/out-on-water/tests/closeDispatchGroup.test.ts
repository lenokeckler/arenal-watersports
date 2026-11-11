import { createOperationsClient } from "@/app/components/dispatch-board/tests/getPendingDispatchReservations.test-utils";
import { describe, expect, it } from "vitest";
import {
  CLOSE_GROUP_DATABASE_ERROR,
  CLOSE_GROUP_STATUS,
} from "../constants/CloseGroup.constants";
import { closeDispatchGroup } from "../services/closeDispatchGroup";
import { getGroupReturnUnits } from "../services/getGroupReturnUnits";
import {
  CLOSE_DISPATCH_ID,
  CLOSE_INPUT_FIXTURE,
  CLOSE_INPUT_WITH_DAMAGE,
  CLOSE_RETURN_UNIT_ROW,
  CLOSE_RPC_RETURNS,
  CLOSE_RPC_RETURNS_WITH_DAMAGE,
  INVALID_CLOSE_INPUTS,
} from "./CloseGroup.constants";

type Rpc = ReturnType<typeof createOperationsClient>["rpc"];

const queueAnswer = (
  rpc: Rpc,
  data: unknown,
  error: { code: string; message: string } | null
) => {
  rpc.mockReset();
  rpc.mockResolvedValueOnce({ data: true, error: null });
  rpc.mockResolvedValueOnce({ data, error });
};

describe("getGroupReturnUnits", () => {
  it("reads the units of the group with the reading they went out with", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, [CLOSE_RETURN_UNIT_ROW], null);

    await expect(
      getGroupReturnUnits(CLOSE_DISPATCH_ID)
    ).resolves.toEqual([
      {
        code: CLOSE_RETURN_UNIT_ROW.code,
        consumesFuel: CLOSE_RETURN_UNIT_ROW.consumes_fuel,
        fuelMax: CLOSE_RETURN_UNIT_ROW.fuel_max,
        fuelOut: CLOSE_RETURN_UNIT_ROW.fuel_out,
        unitId: CLOSE_RETURN_UNIT_ROW.unit_id,
        usageMetric: CLOSE_RETURN_UNIT_ROW.usage_metric,
        usageOut: CLOSE_RETURN_UNIT_ROW.usage_out,
      },
    ]);
    expect(rpc).toHaveBeenLastCalledWith(
      "dispatch_group_return_units",
      { p_dispatch_id: CLOSE_DISPATCH_ID }
    );
  });

  it("answers an empty list when the group has no units", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, null, null);

    await expect(
      getGroupReturnUnits(CLOSE_DISPATCH_ID)
    ).resolves.toEqual([]);
  });

  it("refuses an id that is not a uuid", async () => {
    createOperationsClient(true, true);

    await expect(
      getGroupReturnUnits("not-a-uuid")
    ).rejects.toBeInstanceOf(RangeError);
  });
});

describe("closeDispatchGroup", () => {
  it("sends the arrival and the returns of the group", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, null, null);

    await expect(
      closeDispatchGroup(CLOSE_INPUT_FIXTURE)
    ).resolves.toEqual({
      status: CLOSE_GROUP_STATUS.CLOSED,
    });
    expect(rpc).toHaveBeenLastCalledWith(
      "close_dispatch_group",
      {
        p_arrived_at: CLOSE_INPUT_FIXTURE.arrivedAt,
        p_dispatch_id: CLOSE_DISPATCH_ID,
        p_returns: CLOSE_RPC_RETURNS,
      }
    );
  });

  it("sends the damage report of a unit that came back damaged", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, null, null);

    await closeDispatchGroup(CLOSE_INPUT_WITH_DAMAGE);

    expect(rpc).toHaveBeenLastCalledWith(
      "close_dispatch_group",
      {
        p_arrived_at: CLOSE_INPUT_FIXTURE.arrivedAt,
        p_dispatch_id: CLOSE_DISPATCH_ID,
        p_returns: CLOSE_RPC_RETURNS_WITH_DAMAGE,
      }
    );
  });

  it.each([
    [
      CLOSE_GROUP_DATABASE_ERROR.ALREADY_CLOSED,
      CLOSE_GROUP_STATUS.ALREADY_CLOSED,
    ],
    [
      CLOSE_GROUP_DATABASE_ERROR.INVALID_ARRIVAL,
      CLOSE_GROUP_STATUS.INVALID_ARRIVAL,
    ],
    [
      CLOSE_GROUP_DATABASE_ERROR.INVALID_RETURNS,
      CLOSE_GROUP_STATUS.INVALID_RETURNS,
    ],
  ])("answers %s as %s", async (code, status) => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, null, { code, message: "refused" });

    await expect(
      closeDispatchGroup(CLOSE_INPUT_FIXTURE)
    ).resolves.toEqual({ status });
  });

  it("raises any other database error", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, null, {
      code: "XX000",
      message: "boom",
    });

    await expect(
      closeDispatchGroup(CLOSE_INPUT_FIXTURE)
    ).rejects.toThrow();
  });

  it.each(INVALID_CLOSE_INPUTS)(
    "refuses $name before touching the database",
    async ({ input }) => {
      const { rpc } = createOperationsClient(true, true);
      rpc.mockClear();

      await expect(
        closeDispatchGroup(
          input as Parameters<typeof closeDispatchGroup>[0]
        )
      ).rejects.toBeInstanceOf(RangeError);
      expect(rpc).not.toHaveBeenCalled();
    }
  );
});
