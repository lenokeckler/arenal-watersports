import { describe, expect, it } from "vitest";
import { resolveReservationRefundPath } from "../resolveReservationRefundPath";

const RESERVATION_ID =
  "e2b10000-0000-4000-8000-000000000301";

describe("resolveReservationRefundPath", () => {
  it("builds the refund path of one reservation", () => {
    expect(
      resolveReservationRefundPath(RESERVATION_ID)
    ).toBe(`/reservations/${RESERVATION_ID}/refund`);
  });
});
