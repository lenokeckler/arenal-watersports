import { createOperationsClient } from "./getPendingDispatchReservations.test-utils";
import { describe, expect, it } from "vitest";
import { getDispatchSheet } from "@/app/services/operations/getDispatchSheet";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import { DISPATCH_SHEET_ERROR } from "../constants/DispatchSheet.constants";
import {
  DISPATCH_GROUP_ROW_FIXTURE,
  DISPATCH_INPUT_FIXTURE,
  DISPATCH_UNIT_ROW_FIXTURE,
} from "./DispatchSheetTest.constants";

const QUANTITY_GROUP = {
  ...DISPATCH_GROUP_ROW_FIXTURE,
  tracking_mode: "by_quantity",
};

const queueRpc = (
  rpc: ReturnType<typeof createOperationsClient>["rpc"],
  ...results: unknown[]
) => {
  rpc.mockReset();
  rpc.mockResolvedValueOnce({ data: true, error: null });
  for (const data of results) {
    rpc.mockResolvedValueOnce({ data, error: null });
  }
};

describe("getDispatchSheet", () => {
  it("reads the groups and the candidate units of a unit group", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueRpc(
      rpc,
      [DISPATCH_GROUP_ROW_FIXTURE],
      [DISPATCH_UNIT_ROW_FIXTURE]
    );

    const groups = await getDispatchSheet(
      DISPATCH_INPUT_FIXTURE.RESERVATION_ID
    );

    expect(groups).toEqual([
      {
        candidateUnits: [
          {
            code: DISPATCH_UNIT_ROW_FIXTURE.code,
            fuelLevel: null,
            fuelMax: DISPATCH_UNIT_ROW_FIXTURE.fuel_max,
            isAssigned: false,
            unitId: DISPATCH_UNIT_ROW_FIXTURE.unit_id,
            usageTotal:
              DISPATCH_UNIT_ROW_FIXTURE.usage_total,
          },
        ],
        categoryId: DISPATCH_GROUP_ROW_FIXTURE.category_id,
        categoryName:
          DISPATCH_GROUP_ROW_FIXTURE.category_name,
        consumesFuel: false,
        durationMinutes:
          DISPATCH_GROUP_ROW_FIXTURE.duration_minutes,
        fixedUnitIds: [],
        hasMotor: false,
        isTrackedByUnit: true,
        requiredQuantity:
          DISPATCH_GROUP_ROW_FIXTURE.required_quantity,
        usageMetric: null,
      },
    ]);
  });

  it("asks for no units when a category is counted by quantity", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueRpc(rpc, [QUANTITY_GROUP]);

    const [group] = await getDispatchSheet(
      DISPATCH_INPUT_FIXTURE.RESERVATION_ID
    );

    expect(group.candidateUnits).toEqual([]);
    expect(rpc).toHaveBeenCalledTimes(2);
  });

  it("refuses a reservation that is not a uuid", async () => {
    createOperationsClient(true, true);

    await expect(
      getDispatchSheet(DISPATCH_INPUT_FIXTURE.NOT_A_UUID)
    ).rejects.toThrow(DISPATCH_SHEET_ERROR.INVALID_INPUT);
  });

  it("refuses a worker without the operations area", async () => {
    createOperationsClient(true, false);

    await expect(
      getDispatchSheet(
        DISPATCH_INPUT_FIXTURE.RESERVATION_ID
      )
    ).rejects.toBeInstanceOf(OperationsAccessError);
  });
});
