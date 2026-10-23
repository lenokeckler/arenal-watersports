import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CUSTOM_COMBO_FORM_CURRENCY } from "../constants/CustomComboFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
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

describe("Reservation form compatible extras", () => {
  beforeEach(() => {
    vi.mocked(
      useReservationExtrasViewModel
    ).mockReturnValue(createReservationExtrasViewModel());
  });

  it("shows compatible extras, separate prices, and inventory metadata only when applicable", async () => {
    const page = await selectConcreteBoat();
    expect(
      page.getExtraCheckbox(
        RESERVATION_FORM_VIEW_TEST.EXTRA_SERVICE_NAME
      )
    ).toBeInTheDocument();
    expect(
      page.getExtraCheckbox(
        RESERVATION_FORM_VIEW_TEST.EXTRA_EQUIPMENT_NAME
      )
    ).toBeInTheDocument();
    expect(page.getRenderedText()).toContain(
      formatCustomComboAmount(
        RESERVATION_FORM_VIEW_TEST.EXTRA_SERVICE_PRICE_CRC,
        CUSTOM_COMBO_FORM_CURRENCY.CRC
      )
    );
    expect(
      page
        .getRenderedText()
        ?.match(
          new RegExp(
            RESERVATION_FORM_UI_COPY.EXTRA_INVENTORY_NOTE,
            "g"
          )
        )
    ).toHaveLength(1);
  });

  it("renders the options loading state", async () => {
    vi.mocked(
      useReservationExtrasViewModel
    ).mockReturnValue(
      createReservationExtrasViewModel({
        isLoading: true,
        isPricingLoading: true,
      })
    );
    const page = await selectConcreteBoat();
    expect(page.getRenderedText()).toContain(
      RESERVATION_FORM_UI_COPY.EXTRAS_LOADING
    );
    expect(page.getRenderedText()).toContain(
      RESERVATION_FORM_UI_COPY.QUOTE_LOADING
    );
  });

  it("retries an options error", async () => {
    const retry = vi.fn();
    vi.mocked(
      useReservationExtrasViewModel
    ).mockReturnValue(
      createReservationExtrasViewModel({
        error: RESERVATION_FORM_VIEW_TEST.TEMPORARY_FAILURE,
        retry,
      })
    );
    const page = await selectConcreteBoat();
    await page.clickExtrasRetry();
    expect(retry).toHaveBeenCalledOnce();
  });

  it("shows when no compatible extras are available", async () => {
    vi.mocked(
      useReservationExtrasViewModel
    ).mockReturnValue(
      createReservationExtrasViewModel({ options: [] })
    );
    const page = await selectConcreteBoat();
    expect(page.getRenderedText()).toContain(
      RESERVATION_FORM_UI_COPY.EXTRAS_EMPTY
    );
  });
});
