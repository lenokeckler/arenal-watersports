import { describe, expect, it } from "vitest";
import {
  RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY,
  RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY,
} from "../constants/ReservationPostponementUnavailableCopy.constants";
import { buildReservationPostponementUnavailableBody } from "../utils/buildReservationPostponementUnavailableBody";
import { NOT_POSTPONABLE_STATUS_CASES } from "./ReservationPostponement.constants";

describe("buildReservationPostponementUnavailableBody", () => {
  it.each(NOT_POSTPONABLE_STATUS_CASES)(
    "puts the %s reason before the rule",
    (status) => {
      expect(
        buildReservationPostponementUnavailableBody(status)
      ).toBe(
        `${RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY[status]} ${RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY.RULE}`
      );
    }
  );
});
