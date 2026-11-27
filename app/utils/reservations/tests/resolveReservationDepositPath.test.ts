import { describe, expect, it } from "vitest";
import { resolveReservationDepositPath } from "../resolveReservationDepositPath";

const RESERVATION_ID =
  "e2b10000-0000-4000-8000-000000000301";

describe("resolveReservationDepositPath", () => {
  it("builds the deposit path of one reservation", () => {
    expect(
      resolveReservationDepositPath(RESERVATION_ID)
    ).toBe(`/reservations/${RESERVATION_ID}/deposit`);
  });
});
