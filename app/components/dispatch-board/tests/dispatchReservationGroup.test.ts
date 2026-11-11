import { createOperationsClient } from "./getPendingDispatchReservations.test-utils";
import { describe, expect, it } from "vitest";
import { dispatchReservationGroup } from "@/app/services/operations/dispatchReservationGroup";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import {
  DISPATCH_GROUP_STATUS,
  DISPATCH_SHEET_DATABASE_ERROR,
  DISPATCH_SHEET_ERROR,
} from "../constants/DispatchSheet.constants";
import {
  DISPATCH_INPUT_FIXTURE,
  DISPATCH_READING_FIXTURE,
} from "./DispatchSheetTest.constants";

const INPUT = {
  categoryId: DISPATCH_INPUT_FIXTURE.CATEGORY_ID,
  departureAt: DISPATCH_INPUT_FIXTURE.DEPARTURE_AT,
  readings: [],
  reservationId: DISPATCH_INPUT_FIXTURE.RESERVATION_ID,
  returnsAt: DISPATCH_INPUT_FIXTURE.RETURNS_AT,
  unitIds: [DISPATCH_INPUT_FIXTURE.UNIT_ID],
};

const answerDispatchWith = (
  rpc: ReturnType<typeof createOperationsClient>["rpc"],
  error: { code: string; message: string } | null
) => {
  rpc.mockReset();
  rpc.mockResolvedValueOnce({ data: true, error: null });
  rpc.mockResolvedValueOnce({ data: null, error });
};

describe("dispatchReservationGroup", () => {
  it("sends the chosen units and the real times to the database", async () => {
    const { rpc } = createOperationsClient(true, true);
    answerDispatchWith(rpc, null);

    const result = await dispatchReservationGroup(INPUT);

    expect(result.status).toBe(
      DISPATCH_GROUP_STATUS.DISPATCHED
    );
    expect(rpc).toHaveBeenLastCalledWith(
      "dispatch_reservation_group",
      {
        p_category_id: INPUT.categoryId,
        p_dispatched_at: INPUT.departureAt,
        p_readings: [],
        p_reservation_id: INPUT.reservationId,
        p_returns_at: INPUT.returnsAt,
        p_unit_ids: INPUT.unitIds,
      }
    );
  });

  it("sends one reading per unit with the names the database expects", async () => {
    const { rpc } = createOperationsClient(true, true);
    answerDispatchWith(rpc, null);

    await dispatchReservationGroup({
      ...INPUT,
      readings: [
        {
          fuel: DISPATCH_READING_FIXTURE.FUEL,
          unitId: DISPATCH_INPUT_FIXTURE.UNIT_ID,
          usage: DISPATCH_READING_FIXTURE.USAGE,
        },
      ],
    });

    expect(rpc).toHaveBeenLastCalledWith(
      "dispatch_reservation_group",
      expect.objectContaining({
        p_readings: [
          {
            fuel: DISPATCH_READING_FIXTURE.FUEL,
            unit_id: DISPATCH_INPUT_FIXTURE.UNIT_ID,
            usage: DISPATCH_READING_FIXTURE.USAGE,
          },
        ],
      })
    );
  });

  it("reports readings the database refused", async () => {
    const { rpc } = createOperationsClient(true, true);
    answerDispatchWith(rpc, {
      code: DISPATCH_SHEET_DATABASE_ERROR.INVALID_READINGS,
      message: "readings",
    });

    await expect(
      dispatchReservationGroup(INPUT)
    ).resolves.toEqual({
      status: DISPATCH_GROUP_STATUS.INVALID_READINGS,
    });
  });

  it("reports a category that was already dispatched", async () => {
    const { rpc } = createOperationsClient(true, true);
    answerDispatchWith(rpc, {
      code: DISPATCH_SHEET_DATABASE_ERROR.ALREADY_DISPATCHED,
      message: "already",
    });

    await expect(
      dispatchReservationGroup(INPUT)
    ).resolves.toEqual({
      status: DISPATCH_GROUP_STATUS.ALREADY_DISPATCHED,
    });
  });

  it.each([
    DISPATCH_SHEET_DATABASE_ERROR.INVALID_SELECTION,
    DISPATCH_SHEET_DATABASE_ERROR.UNIT_OUT,
  ])(
    "reports unavailable units for the code %s",
    async (code) => {
      const { rpc } = createOperationsClient(true, true);
      answerDispatchWith(rpc, {
        code,
        message: "unavailable",
      });

      await expect(
        dispatchReservationGroup(INPUT)
      ).resolves.toEqual({
        status: DISPATCH_GROUP_STATUS.UNAVAILABLE,
      });
    }
  );

  it("raises any other database error", async () => {
    const { rpc } = createOperationsClient(true, true);
    answerDispatchWith(rpc, {
      code: "XX000",
      message: "boom",
    });

    await expect(
      dispatchReservationGroup(INPUT)
    ).rejects.toThrow(DISPATCH_SHEET_ERROR.DISPATCH_GROUP);
  });

  it("never reaches the database with an invalid input", async () => {
    const { rpc } = createOperationsClient(true, true);

    await expect(
      dispatchReservationGroup({
        ...INPUT,
        reservationId: DISPATCH_INPUT_FIXTURE.NOT_A_UUID,
      })
    ).rejects.toThrow(DISPATCH_SHEET_ERROR.INVALID_INPUT);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("refuses a worker without the operations area", async () => {
    const { rpc } = createOperationsClient(true, false);

    await expect(
      dispatchReservationGroup(INPUT)
    ).rejects.toBeInstanceOf(OperationsAccessError);
    expect(rpc).toHaveBeenCalledOnce();
  });
});
