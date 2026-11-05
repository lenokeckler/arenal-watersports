import { RESERVATION_CALENDAR_GUIDE_TYPE } from "@/app/constants";
import { describe, expect, it } from "vitest";
import { mapReservationCalendarQueryRow } from "../mapReservationCalendarQueryRow";
import { RESERVATION_CALENDAR_QUERY_MAPPING_ROW as row } from "./ReservationCalendarQueryMapping.constants";

describe("mapReservationCalendarQueryRow", () => {
  it("maps internal and external assigned guides for Operations", () => {
    const entry = mapReservationCalendarQueryRow(row);

    expect(entry.guides).toEqual([
      {
        fullName: "Internal Guide",
        id: "internal-guide",
        type: RESERVATION_CALENDAR_GUIDE_TYPE.INTERNAL,
      },
      {
        fullName: "External Guide",
        id: "external-guide",
        type: RESERVATION_CALENDAR_GUIDE_TYPE.EXTERNAL,
      },
    ]);
  });
});
