import { describe, expect, it } from "vitest";
import { mapReservationHistoryRecord } from "../mapReservationHistoryRecord";
import {
  HISTORY_CANCELLED_RECORD_ROW,
  HISTORY_CLOSED_RECORD_ROW,
} from "./ReservationHistory.constants";

describe("mapReservationHistoryRecord", () => {
  it("maps a cancelled record with its reason", () => {
    const record = mapReservationHistoryRecord(
      HISTORY_CANCELLED_RECORD_ROW
    );
    expect(record.status).toBe(
      HISTORY_CANCELLED_RECORD_ROW.status
    );
    expect(record.cancellationReason).toBe(
      HISTORY_CANCELLED_RECORD_ROW.cancellation_reason
    );
  });

  it("maps a closed record with a null reason", () => {
    const record = mapReservationHistoryRecord(
      HISTORY_CLOSED_RECORD_ROW
    );
    expect(record.status).toBe(
      HISTORY_CLOSED_RECORD_ROW.status
    );
    expect(record.cancellationReason).toBeNull();
  });

  it("keeps the creator and last modifier signatures separate", () => {
    const record = mapReservationHistoryRecord(
      HISTORY_CANCELLED_RECORD_ROW
    );
    expect(record.createdBy).toStrictEqual({
      at: HISTORY_CANCELLED_RECORD_ROW.created_at,
      name: HISTORY_CANCELLED_RECORD_ROW.created_by_name,
    });
    expect(record.updatedBy).toStrictEqual({
      at: HISTORY_CANCELLED_RECORD_ROW.updated_at,
      name: HISTORY_CANCELLED_RECORD_ROW.updated_by_name,
    });
  });
});
