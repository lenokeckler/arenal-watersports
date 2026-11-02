import { describe, expect, it } from "vitest";
import { getReservationInterval } from "../utils/getReservationInterval";
import { RESERVATION_INTERVAL_TEST_CASES } from "./getReservationInterval.constants";

describe("getReservationInterval", () => {
  it.each(RESERVATION_INTERVAL_TEST_CASES)(
    "converts Costa Rica interval $input.date $input.time to UTC",
    ({ input, expected }) => {
      expect(getReservationInterval(input)).toEqual(
        expected
      );
    }
  );
});
