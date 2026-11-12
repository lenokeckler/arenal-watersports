import { describe, expect, it } from "vitest";
import { formatCostaRicaTime } from "../utils/formatCostaRicaTime";
import {
  DISPATCH_CLOCK_FIXTURE,
  DISPATCH_WINDOW_FIXTURE,
} from "./DispatchSheetTest.constants";

describe("formatCostaRicaTime", () => {
  it("formats a date in Costa Rica time", () => {
    expect(
      formatCostaRicaTime(DISPATCH_WINDOW_FIXTURE.NOW)
    ).toBe(DISPATCH_CLOCK_FIXTURE.NOW_COSTA_RICA);
  });

  it("formats an ISO string in Costa Rica time", () => {
    expect(
      formatCostaRicaTime(
        DISPATCH_WINDOW_FIXTURE.NOW.toISOString()
      )
    ).toBe(DISPATCH_CLOCK_FIXTURE.NOW_COSTA_RICA);
  });
});
