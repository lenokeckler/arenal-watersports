import { describe, expect, it } from "vitest";
import { COSTA_RICA_DATE_CASE } from "./reservationFormUtils.constants";
import { getCostaRicaDate } from "../utils/getCostaRicaDate";

describe("getCostaRicaDate", () => {
  it("formats an instant using the Costa Rica civil date", () => {
    expect(
      getCostaRicaDate(
        new Date(COSTA_RICA_DATE_CASE.INSTANT)
      )
    ).toBe(COSTA_RICA_DATE_CASE.EXPECTED_DATE);
  });
});
