import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { formatReservationHistoryDate } from "../utils/formatReservationHistoryDate";
import {
  FORMAT_EXPECTED,
  FORMAT_INSTANTS,
  FORMAT_PROCESS_ZONES,
} from "./ReservationHistoryDateFormat.constants";

describe("formatReservationHistoryDate", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("formats a short Spanish date", () => {
    expect(
      formatReservationHistoryDate(
        FORMAT_INSTANTS.AFTERNOON
      )
    ).toBe(FORMAT_EXPECTED.AFTERNOON_DATE);
  });

  it("uses the Costa Rica day at its boundary", () => {
    expect(
      formatReservationHistoryDate(
        FORMAT_INSTANTS.BEFORE_COSTA_RICA_MIDNIGHT
      )
    ).toBe(FORMAT_EXPECTED.BEFORE_MIDNIGHT_DATE);
    expect(
      formatReservationHistoryDate(
        FORMAT_INSTANTS.AT_COSTA_RICA_MIDNIGHT
      )
    ).toBe(FORMAT_EXPECTED.AT_MIDNIGHT_DATE);
  });

  it("does not depend on the process time zone", () => {
    for (const processZone of FORMAT_PROCESS_ZONES) {
      vi.stubEnv("TZ", processZone);

      expect(
        formatReservationHistoryDate(
          FORMAT_INSTANTS.BEFORE_COSTA_RICA_MIDNIGHT
        )
      ).toBe(FORMAT_EXPECTED.BEFORE_MIDNIGHT_DATE);
    }
  });
});
