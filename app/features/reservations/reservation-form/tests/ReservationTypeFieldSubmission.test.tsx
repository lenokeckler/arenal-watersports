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
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { createCustomComboPage } from "./CustomCombo.page";
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
    conflictWarning: {
      hasError: false,
      isLoading: false,
      items: [],
      retry: vi.fn(),
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

  it("shows an equipment error instead of persisting an empty custom combo", async () => {
    const page = renderReservationForm(true, true, true);

    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
    );
    expect(page.getSubmitButton()).toBeEnabled();

    const customComboPage = createCustomComboPage(
      document.body
    );
    await customComboPage.submit();

    expect(
      customComboPage.getEquipmentSelectionError()
    ).toHaveTextContent(
      RESERVATION_FORM_COPY[RESERVATION_FORM_FIELD.ITEMS]
    );

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
