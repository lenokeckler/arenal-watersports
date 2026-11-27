import { describe, expect, it } from "vitest";
import { resolveReservationExtraTimePath } from "../resolveReservationExtraTimePath";

const RESERVATION_ID =
  "4d3c2b1a-0000-4000-8000-000000000301";

describe("resolveReservationExtraTimePath", () => {
  it("builds the extra time route of a reservation", () => {
    expect(
      resolveReservationExtraTimePath(RESERVATION_ID)
    ).toBe(`/reservations/${RESERVATION_ID}/extra-time`);
  });
});
