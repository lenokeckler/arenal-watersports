import { createOperationsClient } from "./getPendingDispatchReservations.test-utils";
import { describe, expect, it } from "vitest";
import { getCategoryDispatchReservations } from "@/app/services/operations/getCategoryDispatchReservations";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import { DISPATCH_SHEET_ERROR } from "../constants/DispatchSheet.constants";
import { getCostaRicaDayRange } from "../utils/getCostaRicaDayRange";
import {
  CATEGORY_RESERVATION_ROW_FIXTURE,
  DISPATCH_INPUT_FIXTURE,
  DISPATCH_WINDOW_FIXTURE,
} from "./DispatchSheetTest.constants";

const queueRows = (
  rpc: ReturnType<typeof createOperationsClient>["rpc"],
  rows: unknown
) => {
  rpc.mockReset();
  rpc.mockResolvedValueOnce({ data: true, error: null });
  rpc.mockResolvedValueOnce({ data: rows, error: null });
};

describe("getCategoryDispatchReservations", () => {
  it("reads the reservations of the day that commit the category", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueRows(rpc, [CATEGORY_RESERVATION_ROW_FIXTURE]);
    const range = getCostaRicaDayRange(
      DISPATCH_WINDOW_FIXTURE.NOW
    );

    const reservations =
      await getCategoryDispatchReservations(
        DISPATCH_INPUT_FIXTURE.CATEGORY_ID,
        DISPATCH_WINDOW_FIXTURE.NOW
      );

    expect(rpc).toHaveBeenLastCalledWith(
      "category_dispatch_reservations",
      {
        p_category_id: DISPATCH_INPUT_FIXTURE.CATEGORY_ID,
        p_day_end: range.endsAt,
        p_day_start: range.startsAt,
      }
    );
    expect(reservations).toEqual([
      {
        code: CATEGORY_RESERVATION_ROW_FIXTURE.code,
        customerName:
          CATEGORY_RESERVATION_ROW_FIXTURE.customer_name,
        peopleCount:
          CATEGORY_RESERVATION_ROW_FIXTURE.people_count,
        requiredCount:
          CATEGORY_RESERVATION_ROW_FIXTURE.required_count,
        reservationId:
          CATEGORY_RESERVATION_ROW_FIXTURE.reservation_id,
        startsAt:
          CATEGORY_RESERVATION_ROW_FIXTURE.starts_at,
      },
    ]);
  });

  it("answers an empty list when nothing is pending", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueRows(rpc, null);

    await expect(
      getCategoryDispatchReservations(
        DISPATCH_INPUT_FIXTURE.CATEGORY_ID
      )
    ).resolves.toEqual([]);
  });

  it("never reaches the database with a category that is not a uuid", async () => {
    const { rpc } = createOperationsClient(true, true);

    await expect(
      getCategoryDispatchReservations(
        DISPATCH_INPUT_FIXTURE.NOT_A_UUID
      )
    ).rejects.toThrow(DISPATCH_SHEET_ERROR.INVALID_INPUT);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("refuses a worker without the operations area", async () => {
    createOperationsClient(true, false);

    await expect(
      getCategoryDispatchReservations(
        DISPATCH_INPUT_FIXTURE.CATEGORY_ID
      )
    ).rejects.toBeInstanceOf(OperationsAccessError);
  });

  it("raises a failed read", async () => {
    const { rpc } = createOperationsClient(true, true);
    rpc.mockReset();
    rpc.mockResolvedValueOnce({ data: true, error: null });
    rpc.mockResolvedValueOnce({
      data: null,
      error: { code: "XX000", message: "boom" },
    });

    await expect(
      getCategoryDispatchReservations(
        DISPATCH_INPUT_FIXTURE.CATEGORY_ID
      )
    ).rejects.toThrow();
  });
});
