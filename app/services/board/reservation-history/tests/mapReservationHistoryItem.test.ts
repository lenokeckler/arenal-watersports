import { describe, expect, it } from "vitest";
import { RESERVATION_HISTORY_ERROR } from "@/app/constants";
import { mapReservationHistoryItem } from "../mapReservationHistoryItem";
import {
  HISTORY_CANCELLED_LIST_ROW,
  HISTORY_LIST_ROW,
  HISTORY_UNEXPECTED_STATUS,
} from "./ReservationHistory.constants";

describe("mapReservationHistoryItem", () => {
  it("maps a row and renames the creator to attendedByName", () => {
    expect(
      mapReservationHistoryItem(HISTORY_LIST_ROW)
    ).toStrictEqual({
      attendedByName: HISTORY_LIST_ROW.created_by_name,
      customerName: HISTORY_LIST_ROW.customer_name,
      equipmentNames: HISTORY_LIST_ROW.equipment_names,
      guideNames: HISTORY_LIST_ROW.guide_names,
      id: HISTORY_LIST_ROW.id,
      startsAt: HISTORY_LIST_ROW.starts_at,
      status: HISTORY_LIST_ROW.status,
    });
  });

  it("keeps a cancelled status", () => {
    expect(
      mapReservationHistoryItem(HISTORY_CANCELLED_LIST_ROW)
        .status
    ).toBe(HISTORY_CANCELLED_LIST_ROW.status);
  });

  it("refuses a status outside the history", () => {
    expect(() =>
      mapReservationHistoryItem({
        ...HISTORY_LIST_ROW,
        status: HISTORY_UNEXPECTED_STATUS,
      })
    ).toThrow(
      expect.objectContaining({
        cause: HISTORY_UNEXPECTED_STATUS,
        message:
          RESERVATION_HISTORY_ERROR.UNEXPECTED_STATUS,
      })
    );
  });
});
