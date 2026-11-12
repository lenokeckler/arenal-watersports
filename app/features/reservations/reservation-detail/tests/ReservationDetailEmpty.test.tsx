import { describe, expect, it } from "vitest";
import { RESERVATION_DETAIL_SECTIONS_COPY as copy } from "../constants/ReservationDetailSectionsCopy.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import { renderReservationDetail } from "./ReservationDetailTestRenderer";

describe("reservation detail empty data", (): void => {
  it("explains when optional reservation records are absent", (): void => {
    const page = renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      reservation_dispatches: [],
      reservation_guides: [],
      reservation_items: [],
    });

    [
      copy.MISSING_DISPATCHES,
      copy.MISSING_EQUIPMENT,
      copy.MISSING_EXTRAS,
      copy.MISSING_GUIDES,
    ].forEach((message) => {
      expect(page.getText(message)).toBeVisible();
    });
  });
});
