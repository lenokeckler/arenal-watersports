import { describe, expect, it } from "vitest";
import { resolveReservationPostponePath } from "../resolveReservationPostponePath";
import {
  EXPECTED_POSTPONE_PATH,
  FAKE_RESERVATION_ID,
} from "./resolveReservationPostponePath.constants";

describe("resolveReservationPostponePath", () => {
  it("builds the postpone path of one reservation", () => {
    expect(
      resolveReservationPostponePath(FAKE_RESERVATION_ID)
    ).toBe(EXPECTED_POSTPONE_PATH);
  });
});
