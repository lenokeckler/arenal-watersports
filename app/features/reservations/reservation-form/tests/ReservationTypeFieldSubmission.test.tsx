import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { createCustomComboReservationAction } from "../actions/createCustomComboReservationAction";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";
import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import { RESERVATION_SUBMIT_TEST } from "./createReservationFormSubmitHandler.constants";

const comboDraft = vi.hoisted(() => ({
  items: [] as CustomComboEquipmentSelection[],
}));

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));
vi.mock(
  "../actions/createCustomComboReservationAction",
  () => ({
    createCustomComboReservationAction: vi.fn(),
  })
);
vi.mock("../hooks/useCustomComboForm", () => ({
  useCustomComboForm: () => ({
    draft: {
      ...RESERVATION_SUBMIT_TEST.COMBO_OPTIONS.customCombo
        .draft,
      items: comboDraft.items,
    },
    hasGuideOnlyItem: true,
  }),
}));
vi.mock("../components/CustomComboPricingSummary", () => ({
  default: () => null,
}));

describe("ReservationTypeField submission", () => {
  beforeEach(() => {
    comboDraft.items = [];
    vi.clearAllMocks();
  });

  it("persists the selected reservation type", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = renderReservationForm(true, true, true);

    await page.fillCustomerName(
      RESERVATION_FORM_VIEW_TEST.CUSTOMER_NAME
    );
    await page.selectCategory(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_ID
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
    );
    expect(page.getSubmitButton()).toBeDisabled();
    await page.submit();

    expect(createReservationAction).not.toHaveBeenCalled();
    expect(
      createCustomComboReservationAction
    ).not.toHaveBeenCalled();
  });

  it("dispatches a valid custom combo through the current form", async () => {
    comboDraft.items = [
      ...RESERVATION_SUBMIT_TEST.COMBO_OPTIONS.customCombo
        .draft.items,
    ];
    vi.mocked(
      createCustomComboReservationAction
    ).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = renderReservationForm(true, true, true);

    await page.fillCustomerName(
      RESERVATION_FORM_VIEW_TEST.CUSTOMER_NAME
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
    );
    await page.submit();

    await waitFor(() =>
      expect(
        createCustomComboReservationAction
      ).toHaveBeenCalledWith(
        expect.objectContaining({ items: comboDraft.items })
      )
    );
    expect(createReservationAction).not.toHaveBeenCalled();
  });
});
