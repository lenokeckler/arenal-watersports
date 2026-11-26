export const EXTRA_FORM_FIELD_ID = {
  HINT: "extra-form-hint",
  NAME: "extra-name",
  OCCUPANCY_CHARGE_ONLY: "extra-occupancy-charge-only",
  OCCUPANCY_KIND: "extra-occupancy-kind",
  OCCUPANCY_TOGGLE: "extra-occupancy-toggle",
  OCCUPIES_CATEGORY: "extra-occupies-category",
  OCCUPIES_QUANTITY: "extra-occupies-quantity",
  PRICE_CRC: "extra-price-crc",
  PRICE_USD: "extra-price-usd",
} as const;

export type ExtraFormFieldId =
  (typeof EXTRA_FORM_FIELD_ID)[keyof typeof EXTRA_FORM_FIELD_ID];
