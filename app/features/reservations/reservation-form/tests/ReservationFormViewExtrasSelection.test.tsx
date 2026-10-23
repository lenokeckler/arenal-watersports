import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { CUSTOM_COMBO_FORM_CURRENCY } from "../constants/CustomComboFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { useReservationExtrasViewModel } from "../hooks/useReservationExtrasViewModel";
import { createReservationExtrasViewModel } from "./ReservationExtrasViewModel.fixture";
import { selectConcreteBoat } from "./ReservationFormExtras.testHarness";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { formatCustomComboAmount } from "../utils/formatCustomComboAmount";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));
vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({ getAvailableReservationUnitsAction: vi.fn() })
);
vi.mock("../hooks/useReservationExtrasViewModel", () => ({
  useReservationExtrasViewModel: vi.fn(),
}));

describe("Reservation form extra selection", () => {
  beforeEach(() => {
    vi.mocked(
      useReservationExtrasViewModel
    ).mockReturnValue(createReservationExtrasViewModel());
  });

  it("submits selected extra identifiers and supports unselection", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = await selectConcreteBoat();
    const extraName =
      RESERVATION_FORM_VIEW_TEST.EXTRA_SERVICE_NAME;
    await page.toggleExtra(extraName);
    expect(page.getExtraCheckbox(extraName)).toBeChecked();
    await page.toggleExtra(extraName);
    expect(
      page.getExtraCheckbox(extraName)
    ).not.toBeChecked();
    await page.toggleExtra(extraName);
    await page.submit();
    expect(createReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        extraIds: [
          RESERVATION_FORM_VIEW_TEST.EXTRA_SERVICE_ID,
        ],
      })
    );
  });

  it("shows server totals and hides extras for combo reservations", async () => {
    const page = await selectConcreteBoat();
    expect(page.getExtrasQuote()).toBeInTheDocument();
    expect(page.getRenderedText()).toContain(
      formatCustomComboAmount(
        RESERVATION_FORM_VIEW_TEST.EXTRA_QUOTE_CRC,
        CUSTOM_COMBO_FORM_CURRENCY.CRC
      )
    );
    expect(page.getRenderedText()).toContain(
      formatCustomComboAmount(
        RESERVATION_FORM_VIEW_TEST.EXTRA_QUOTE_USD,
        CUSTOM_COMBO_FORM_CURRENCY.USD
      )
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
    );
    expect(page.getRenderedText()).not.toContain(
      RESERVATION_FORM_UI_COPY.EXTRAS_TITLE
    );
    expect(page.getRenderedText()).not.toContain(
      RESERVATION_FORM_UI_COPY.QUOTE_TITLE
    );
  });
});
