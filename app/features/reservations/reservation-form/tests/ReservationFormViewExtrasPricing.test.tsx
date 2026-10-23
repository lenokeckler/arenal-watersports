import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { useReservationExtrasViewModel } from "../hooks/useReservationExtrasViewModel";
import { createReservationExtrasViewModel } from "./ReservationExtrasViewModel.fixture";
import { selectConcreteBoat } from "./ReservationFormExtras.testHarness";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

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

describe("Reservation form server quote", () => {
  beforeEach(() => {
    vi.mocked(
      useReservationExtrasViewModel
    ).mockReturnValue(createReservationExtrasViewModel());
  });

  it("retries quote errors", async () => {
    const retryPricing = vi.fn();
    vi.mocked(
      useReservationExtrasViewModel
    ).mockReturnValue(
      createReservationExtrasViewModel({
        pricingError:
          RESERVATION_FORM_VIEW_TEST.TEMPORARY_FAILURE,
        retryPricing,
      })
    );
    const page = await selectConcreteBoat();
    await page.clickQuoteRetry();
    expect(retryPricing).toHaveBeenCalledOnce();
  });

  it("explains when the boat tariff is missing", async () => {
    vi.mocked(
      useReservationExtrasViewModel
    ).mockReturnValue(
      createReservationExtrasViewModel({
        pricing: {
          hasBoatTariff: false,
          listAmountCrc: null,
          listAmountUsd: null,
        },
      })
    );
    const page = await selectConcreteBoat();
    expect(page.getRenderedText()).toContain(
      RESERVATION_FORM_UI_COPY.QUOTE_MISSING_TARIFF
    );
  });

  it("explains when a quote currency is unavailable", async () => {
    vi.mocked(
      useReservationExtrasViewModel
    ).mockReturnValue(
      createReservationExtrasViewModel({
        pricing: {
          hasBoatTariff: true,
          listAmountCrc: null,
          listAmountUsd:
            RESERVATION_FORM_VIEW_TEST.EXTRA_QUOTE_USD,
        },
      })
    );
    const page = await selectConcreteBoat();
    expect(page.getRenderedText()).toContain(
      RESERVATION_FORM_UI_COPY.QUOTE_MISSING_CURRENCY
    );
  });
});
