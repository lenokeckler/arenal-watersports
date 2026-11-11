import { describe, expect, it } from "vitest";
import { resolveReservationCancelPath } from "../resolveReservationCancelPath";

const RESERVATION_ID =
  "e2b10000-0000-4000-8000-000000000301";

describe("resolveReservationCancelPath", () => {
  it("builds the cancel path of one reservation", () => {
    expect(
      resolveReservationCancelPath(RESERVATION_ID)
    ).toBe(`/reservations/${RESERVATION_ID}/cancel`);
  });
});
