import type { ReservationExtrasViewModel } from "../models/ReservationExtrasViewModel.interface";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

export const createReservationExtrasViewModel = (
  overrides: Partial<ReservationExtrasViewModel> = {}
): ReservationExtrasViewModel => ({
  error: null,
  isLoading: false,
  options: [
    {
      id: RESERVATION_FORM_VIEW_TEST.EXTRA_SERVICE_ID,
      name: RESERVATION_FORM_VIEW_TEST.EXTRA_SERVICE_NAME,
      occupiesCategoryId: null,
      occupiesQuantity: null,
      priceCrc:
        RESERVATION_FORM_VIEW_TEST.EXTRA_SERVICE_PRICE_CRC,
      priceUsd:
        RESERVATION_FORM_VIEW_TEST.EXTRA_SERVICE_PRICE_USD,
    },
    {
      id: RESERVATION_FORM_VIEW_TEST.EXTRA_EQUIPMENT_ID,
      name: RESERVATION_FORM_VIEW_TEST.EXTRA_EQUIPMENT_NAME,
      occupiesCategoryId:
        RESERVATION_FORM_VIEW_TEST.CATEGORY_ID,
      occupiesQuantity:
        RESERVATION_FORM_VIEW_TEST.EXTRA_INVENTORY_QUANTITY,
      priceCrc: null,
      priceUsd: null,
    },
  ],
  pricing: {
    hasBoatTariff: true,
    listAmountCrc:
      RESERVATION_FORM_VIEW_TEST.EXTRA_QUOTE_CRC,
    listAmountUsd:
      RESERVATION_FORM_VIEW_TEST.EXTRA_QUOTE_USD,
  },
  pricingError: null,
  isPricingLoading: false,
  retry: () => undefined,
  retryPricing: () => undefined,
  ...overrides,
});
