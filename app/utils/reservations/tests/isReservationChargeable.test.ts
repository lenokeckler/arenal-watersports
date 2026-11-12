import { RESERVATION_STATUS } from "@/app/constants";
import { describe, expect, it } from "vitest";
import { isReservationChargeable } from "../isReservationChargeable";
import {
  CHARGEABLE_STATUSES,
  PARENT_RESERVATION_ID,
} from "./isReservationChargeable.constants";

describe("isReservationChargeable", () => {
  it.each(CHARGEABLE_STATUSES)(
    "accepts a %s reservation that is not a split child",
    (status) => {
      expect(
        isReservationChargeable({
          parentReservationId: null,
          status,
        })
      ).toBe(true);
    }
  );

  it("refuses a cancelled reservation", () => {
    expect(
      isReservationChargeable({
        parentReservationId: null,
        status: RESERVATION_STATUS.CANCELLED,
      })
    ).toBe(false);
  });

  it.each(CHARGEABLE_STATUSES)(
    "refuses a %s split child",
    (status) => {
      expect(
        isReservationChargeable({
          parentReservationId: PARENT_RESERVATION_ID,
          status,
        })
      ).toBe(false);
    }
  );
});
