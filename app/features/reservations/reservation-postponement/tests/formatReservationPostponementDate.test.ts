import { describe, expect, it } from "vitest";
import { formatReservationPostponementDate } from "../utils/formatReservationPostponementDate";
import { POSTPONEMENT_DATE_CASES } from "./ReservationPostponement.constants";

describe("formatReservationPostponementDate", () => {
  it.each(POSTPONEMENT_DATE_CASES)(
    "writes %s as %s in Spanish regardless of the machine time zone",
    (date, expected) => {
      expect(formatReservationPostponementDate(date)).toBe(
        expected
      );
    }
  );
});
