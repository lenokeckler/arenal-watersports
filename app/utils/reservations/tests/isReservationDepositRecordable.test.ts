import { describe, expect, it } from "vitest";
import { isReservationDepositRecordable } from "../isReservationDepositRecordable";
import {
  DEPOSITABLE_STATUSES,
  PARENT_RESERVATION_ID,
  UNDEPOSITABLE_STATUSES,
} from "./isReservationDepositRecordable.constants";

describe("isReservationDepositRecordable", () => {
  it.each(DEPOSITABLE_STATUSES)(
    "accepts a %s reservation that is not a split child",
    (status) => {
      expect(
        isReservationDepositRecordable({
          parentReservationId: null,
          status,
        })
      ).toBe(true);
    }
  );

  it.each(UNDEPOSITABLE_STATUSES)(
    "refuses a %s reservation",
    (status) => {
      expect(
        isReservationDepositRecordable({
          parentReservationId: null,
          status,
        })
      ).toBe(false);
    }
  );

  it.each(DEPOSITABLE_STATUSES)(
    "refuses a %s split child",
    (status) => {
      expect(
        isReservationDepositRecordable({
          parentReservationId: PARENT_RESERVATION_ID,
          status,
        })
      ).toBe(false);
    }
  );
});
