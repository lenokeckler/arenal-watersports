import { describe, expect, it } from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import { RESERVATION_CHARGE_UNAVAILABLE_REASON as REASON } from "../constants/ReservationChargeUnavailableReason.constants";
import { resolveReservationChargeUnavailableReason } from "../utils/resolveReservationChargeUnavailableReason";
import { CHARGE_PARENT_RESERVATION_ID } from "./ReservationCharge.constants";

describe("resolveReservationChargeUnavailableReason", () => {
  it("names a cancelled reservation", () => {
    expect(
      resolveReservationChargeUnavailableReason({
        parentReservationId: null,
        status: RESERVATION_STATUS.CANCELLED,
      })
    ).toBe(REASON.CANCELLED);
  });

  it("names a split child that is still open", () => {
    expect(
      resolveReservationChargeUnavailableReason({
        parentReservationId: CHARGE_PARENT_RESERVATION_ID,
        status: RESERVATION_STATUS.SCHEDULED,
      })
    ).toBe(REASON.SPLIT_CHILD);
  });

  it("prefers the cancelled reason for a cancelled split child", () => {
    expect(
      resolveReservationChargeUnavailableReason({
        parentReservationId: CHARGE_PARENT_RESERVATION_ID,
        status: RESERVATION_STATUS.CANCELLED,
      })
    ).toBe(REASON.CANCELLED);
  });
});
