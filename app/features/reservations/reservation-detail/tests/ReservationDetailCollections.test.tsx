import { describe, expect, it } from "vitest";
import { RESERVATION_DETAIL_SECTIONS_COPY as copy } from "../constants/ReservationDetailSectionsCopy.constants";
import { RESERVATION_DETAIL_TEST as test } from "./ReservationDetailTest.constants";
import { renderReservationDetail } from "./ReservationDetailTestRenderer";

describe("reservation detail operational collections", (): void => {
  it("shows committed equipment, extras, and assigned guides", (): void => {
    const page = renderReservationDetail();

    expect(
      page.getEquipmentText(test.UNIT_CODE)
    ).toBeVisible();
    expect(page.getText(test.EXTRA_NAME)).toBeVisible();
    expect(page.getText(test.GUIDE_NAME)).toBeVisible();
    expect(
      page.getTexts(`${copy.QUANTITY}: ${test.QUANTITY}`)
    ).toHaveLength(2);
  });
});
