import { expect, it, vi } from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { renderReservationGuideForm } from "./ReservationGuideAssignment.fixture";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

it("shows and focuses a guide assignment error returned by the server", async () => {
  vi.mocked(createReservationAction).mockResolvedValue({
    ok: false,
    errors: {
      [RESERVATION_FORM_FIELD.GUIDE_IDS]:
        CUSTOM_COMBO_RESERVATION_COPY.INVALID_GUIDES,
    },
  });
  const page = renderReservationGuideForm();
  await page.selectReservationType(
    RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );
  await page.submit();

  const guideError = page.getGuideAssignmentError();
  expect(guideError).toBeVisible();
  expect(guideError).toHaveTextContent(
    CUSTOM_COMBO_RESERVATION_COPY.INVALID_GUIDES
  );
  expect(page.getFocusedElement()).toBe(guideError);
});
