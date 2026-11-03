import { vi } from "vitest";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

export const selectConcreteBoat = async () => {
  vi.mocked(
    getAvailableReservationUnitsAction
  ).mockResolvedValue([
    {
      code: RESERVATION_FORM_VIEW_TEST.UNIT_CODE,
      id: RESERVATION_FORM_VIEW_TEST.UNIT_ID,
    },
  ]);
  const page = renderReservationForm();
  await page.selectReservationType(
    RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );
  await page.selectCategory(
    RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
  );
  await page.findUnitOption();
  await page.selectUnit(RESERVATION_FORM_VIEW_TEST.UNIT_ID);
  return page;
};
