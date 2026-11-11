export const EXTRA_FORM_FIELD_ID = {
  HINT: "extra-form-hint",
  NAME: "extra-name",
  PRICE_CRC: "extra-price-crc",
  PRICE_USD: "extra-price-usd",
} as const;

export type ExtraFormFieldId =
  (typeof EXTRA_FORM_FIELD_ID)[keyof typeof EXTRA_FORM_FIELD_ID];
