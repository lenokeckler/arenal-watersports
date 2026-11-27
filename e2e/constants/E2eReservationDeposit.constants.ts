const CATEGORY_DEPOSIT_USD = 200;
const CATEGORY_DEPOSIT_CRC = 100000;
const EDITED_AMOUNT_VALUE = 150;

export const E2E_RESERVATION_DEPOSIT = {
  CATEGORY_DEPOSIT_CRC,
  CATEGORY_DEPOSIT_USD,
  CATEGORY_OPERATION: "set the deposit of the E2E category",
  CLEANUP_OPERATION: "remove the E2E deposits",
  EDITED_AMOUNT: `${EDITED_AMOUNT_VALUE}`,
  EDITED_AMOUNT_VALUE,
  FIELD_SEPARATOR: "|",
  INVALID_AMOUNT: "abc",
  READ_OPERATION:
    "read the deposit decision of the reservation",
  SCREENSHOT_BASENAME: "reservation-deposit",
  TEST_MODE: "serial",
} as const;

export const E2E_RESERVATION_DEPOSIT_SCREENSHOT_STATE = {
  DECLINED: "declined",
  DETAIL: "detail",
  DETAIL_RECORDED: "detail-recorded",
  ERROR: "error",
  FORM: "form",
  SUCCESS: "success",
  UNAVAILABLE: "unavailable",
} as const;
