import { STRING } from "@/app/constants";
import { describe, expect, it } from "vitest";
import { getReservationIntervalLabel } from "../utils/getReservationIntervalLabel";
import {
  RESERVATION_CATEGORY_AVAILABILITY_CROSS_DAY_INPUT,
  RESERVATION_CATEGORY_AVAILABILITY_INPUT,
} from "./getReservationInterval.constants";

describe("getReservationIntervalLabel", () => {
  it("formats the selected interval in Costa Rica time", () => {
    expect(
      getReservationIntervalLabel(
        RESERVATION_CATEGORY_AVAILABILITY_INPUT
      )
    ).toBe(
      "martes, 1 de enero de 2030 · 10:00 a. m.–12:00 p. m."
    );
  });

  it("includes both dates when the interval crosses midnight", () => {
    expect(
      getReservationIntervalLabel(
        RESERVATION_CATEGORY_AVAILABILITY_CROSS_DAY_INPUT
      )
    ).toBe(
      "martes, 31 de diciembre de 2030–miércoles, 1 de enero de 2031 · 11:00 p. m.–12:00 a. m."
    );
  });

  it("does not format an incomplete interval", () => {
    expect(
      getReservationIntervalLabel({
        ...RESERVATION_CATEGORY_AVAILABILITY_INPUT,
        date: STRING.Empty,
      })
    ).toBe(STRING.Empty);
  });
});
