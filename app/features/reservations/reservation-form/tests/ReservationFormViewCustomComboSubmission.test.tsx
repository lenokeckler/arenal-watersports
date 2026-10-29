import { INDEX } from "@/app/constants";
import { describe, expect, it, vi } from "vitest";
import { createCustomComboReservationAction } from "../actions/createCustomComboReservationAction";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { CUSTOM_COMBO_TEST } from "./CustomCombo.constants";
import { createCustomComboPage } from "./CustomCombo.page";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { RESERVATION_GUIDE_SELECTION_TEST } from "./ReservationGuideSelection.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

vi.mock("../actions/getCustomComboPricingAction", () => ({
  getCustomComboPricingAction: vi.fn().mockResolvedValue({
    ok: true,
    pricing: {
      listAmountCrc: CUSTOM_COMBO_TEST.SUGGESTED_CRC_AMOUNT,
      listAmountUsd: CUSTOM_COMBO_TEST.SUGGESTED_USD_AMOUNT,
    },
  }),
}));

vi.mock(
  "../actions/createCustomComboReservationAction",
  () => ({
    createCustomComboReservationAction: vi.fn(),
  })
);

const submitComboWithGuide = async (): Promise<void> => {
  vi.mocked(
    createCustomComboReservationAction
  ).mockResolvedValue({
    ok: true,
    reservationId:
      RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
  });
  const page = renderReservationForm({
    guides: [
      {
        id: RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
        name: RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME,
      },
    ],
    kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
  });
  const combo = createCustomComboPage(document.body);
  await combo.selectComboWithGuide(
    RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME,
    RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME
  );
  await page.fillCustomerName(
    RESERVATION_FORM_VIEW_TEST.CUSTOMER_NAME
  );
  await page.submit();
};

describe("custom combo reservation submission", () => {
  it("submits the selected guide with a guide-only combo component", async () => {
    await submitComboWithGuide();

    expect(
      createCustomComboReservationAction
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        guideIds: [
          RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
        ],
        items: [
          {
            categoryId:
              RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID,
            quantity: INDEX.FIRST,
          },
        ],
      })
    );
  });
});
