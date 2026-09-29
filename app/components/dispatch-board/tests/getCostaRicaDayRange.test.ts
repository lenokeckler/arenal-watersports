import { getCostaRicaDayRange } from "../utils/getCostaRicaDayRange";
import { COSTA_RICA_DATE_FIXTURE } from "./DispatchBoardTest.constants";

describe("getCostaRicaDayRange", () => {
  it("uses the Costa Rica calendar day around the UTC boundary", () => {
    const range = getCostaRicaDayRange(
      COSTA_RICA_DATE_FIXTURE.PREVIOUS_LOCAL_DAY
    );

    expect(range).toEqual({
      startsAt:
        COSTA_RICA_DATE_FIXTURE.EXPECTED_PREVIOUS_DAY_START,
      endsAt:
        COSTA_RICA_DATE_FIXTURE.EXPECTED_PREVIOUS_DAY_END,
    });
  });

  it("returns the half-open UTC interval for Costa Rica midnight", () => {
    const range = getCostaRicaDayRange(
      COSTA_RICA_DATE_FIXTURE.TODAY_AT_LOCAL_MIDNIGHT
    );

    expect(range).toEqual({
      startsAt:
        COSTA_RICA_DATE_FIXTURE.EXPECTED_TODAY_START,
      endsAt: COSTA_RICA_DATE_FIXTURE.EXPECTED_TODAY_END,
    });
  });
});
