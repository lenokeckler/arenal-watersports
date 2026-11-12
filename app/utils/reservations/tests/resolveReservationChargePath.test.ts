import { describe, expect, it } from "vitest";
import { resolveReservationChargePath } from "../resolveReservationChargePath";

const RESERVATION_ID =
  "e2b10000-0000-4000-8000-000000000301";

describe("resolveReservationChargePath", () => {
  it("builds the charge path of one reservation", () => {
    expect(
      resolveReservationChargePath(RESERVATION_ID)
    ).toBe(`/reservations/${RESERVATION_ID}/charge`);
  });
});
