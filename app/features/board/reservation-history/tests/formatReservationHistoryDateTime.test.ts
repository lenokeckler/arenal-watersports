import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { formatReservationHistoryDateTime } from "../utils/formatReservationHistoryDateTime";
import {
  FORMAT_EXPECTED,
  FORMAT_INSTANTS,
  FORMAT_PROCESS_ZONES,
} from "./ReservationHistoryDateFormat.constants";

describe("formatReservationHistoryDateTime", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("formats a short Spanish date and 12-hour time", () => {
    expect(
      formatReservationHistoryDateTime(
        FORMAT_INSTANTS.AFTERNOON
      )
    ).toBe(FORMAT_EXPECTED.AFTERNOON_DATE_TIME);
  });

  it("uses Costa Rica time at its midnight boundary", () => {
    expect(
      formatReservationHistoryDateTime(
        FORMAT_INSTANTS.AT_COSTA_RICA_MIDNIGHT
      )
    ).toBe(FORMAT_EXPECTED.AT_MIDNIGHT_DATE_TIME);
  });

  it("does not depend on the process time zone", () => {
    for (const processZone of FORMAT_PROCESS_ZONES) {
      vi.stubEnv("TZ", processZone);

      expect(
        formatReservationHistoryDateTime(
          FORMAT_INSTANTS.AFTERNOON
        )
      ).toBe(FORMAT_EXPECTED.AFTERNOON_DATE_TIME);
    }
  });
});
