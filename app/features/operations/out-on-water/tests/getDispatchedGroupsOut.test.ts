import { createOperationsClient } from "@/app/components/dispatch-board/tests/getPendingDispatchReservations.test-utils";
import { describe, expect, it } from "vitest";
import { getDispatchedGroupsOut } from "../services/getDispatchedGroupsOut";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import { OUT_ON_WATER_ROW_FIXTURE } from "./OutOnWater.constants";

const queueRows = (
  rpc: ReturnType<typeof createOperationsClient>["rpc"],
  rows: unknown
) => {
  rpc.mockReset();
  rpc.mockResolvedValueOnce({ data: true, error: null });
  rpc.mockResolvedValueOnce({ data: rows, error: null });
};

describe("getDispatchedGroupsOut", () => {
  it("reads the groups that are out with their return hour", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueRows(rpc, [OUT_ON_WATER_ROW_FIXTURE]);

    const groups = await getDispatchedGroupsOut();

    expect(rpc).toHaveBeenLastCalledWith(
      "dispatched_groups_out"
    );
    expect(groups).toEqual([
      {
        categoryId: OUT_ON_WATER_ROW_FIXTURE.category_id,
        categoryName:
          OUT_ON_WATER_ROW_FIXTURE.category_name,
        code: OUT_ON_WATER_ROW_FIXTURE.code,
        customerName:
          OUT_ON_WATER_ROW_FIXTURE.customer_name,
        dispatchId: OUT_ON_WATER_ROW_FIXTURE.dispatch_id,
        dispatchedAt:
          OUT_ON_WATER_ROW_FIXTURE.dispatched_at,
        durationMinutes:
          OUT_ON_WATER_ROW_FIXTURE.duration_minutes,
        endsAt: OUT_ON_WATER_ROW_FIXTURE.ends_at,
        extendedMinutes:
          OUT_ON_WATER_ROW_FIXTURE.extended_minutes,
        quantity: OUT_ON_WATER_ROW_FIXTURE.quantity,
        reservationId:
          OUT_ON_WATER_ROW_FIXTURE.reservation_id,
        unitCodes: OUT_ON_WATER_ROW_FIXTURE.unit_codes,
      },
    ]);
  });

  it("answers an empty list when nothing is out", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueRows(rpc, null);

    await expect(getDispatchedGroupsOut()).resolves.toEqual(
      []
    );
  });

  it("refuses a worker without the operations area", async () => {
    createOperationsClient(true, false);

    await expect(
      getDispatchedGroupsOut()
    ).rejects.toBeInstanceOf(OperationsAccessError);
  });
});
