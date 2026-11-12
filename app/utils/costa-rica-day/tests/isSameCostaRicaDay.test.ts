import { describe, expect, it } from "vitest";
import { isSameCostaRicaDay } from "../isSameCostaRicaDay";
import {
  EVENING_IN_COSTA_RICA_AFTER_UTC_MIDNIGHT,
  FIRST_INSTANT_OF_NEXT_DAY,
  FIRST_INSTANT_OF_SAME_DAY,
  LAST_INSTANT_OF_PREVIOUS_DAY,
  MORNING_IN_COSTA_RICA,
} from "./isSameCostaRicaDay.constants";

describe("isSameCostaRicaDay", () => {
  it("is true for two instants of the same Costa Rica day", () => {
    expect(
      isSameCostaRicaDay(
        MORNING_IN_COSTA_RICA,
        FIRST_INSTANT_OF_SAME_DAY
      )
    ).toBe(true);
  });

  it("keeps the evening in Costa Rica on the same day after UTC midnight", () => {
    expect(
      isSameCostaRicaDay(
        MORNING_IN_COSTA_RICA,
        EVENING_IN_COSTA_RICA_AFTER_UTC_MIDNIGHT
      )
    ).toBe(true);
  });

  it("is false once the next Costa Rica day starts", () => {
    expect(
      isSameCostaRicaDay(
        FIRST_INSTANT_OF_SAME_DAY,
        FIRST_INSTANT_OF_NEXT_DAY
      )
    ).toBe(false);
  });

  it("is false just before the day starts", () => {
    expect(
      isSameCostaRicaDay(
        FIRST_INSTANT_OF_SAME_DAY,
        LAST_INSTANT_OF_PREVIOUS_DAY
      )
    ).toBe(false);
  });
});
