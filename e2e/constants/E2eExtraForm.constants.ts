import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
} from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogCopy.constants";
import { EXTRA_PRICE_ERROR_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraPriceErrorCopy.constants";
import type { E2eInvalidExtraPrice } from "../models/E2eInvalidExtraPrice.interface";

export const E2E_EXTRA_FORM_SCREENSHOT_BASENAME = {
  CREATE_ERROR: "us-adm-19-extra-create-error",
  EDIT: "us-adm-19-extra-edit",
} as const;

export const E2E_EXTRA_FORM_SCENARIO = {
  CANCEL: "form_cancel",
  CREATE: "form_create",
  CREATE_BOTH_PRICES: "form_create_both",
  CREATE_INVALID_PRICE: "form_create_invalid",
  CREATE_NO_PRICE: "form_create_no_price",
  DUPLICATE: "form_duplicate",
  EDIT: "form_edit",
  EDIT_PRICE: "form_edit_price",
  EDIT_RENAMED: "form_edit_renamed",
  SCREENSHOT_EDIT: "form_screenshot_edit",
} as const;

export const E2E_EXTRA_PRICE_TEXT = {
  CRC: "15000",
  USD: "25",
  USD_EDITED: "32.5",
} as const;

export const E2E_INVALID_EXTRA_PRICES: E2eInvalidExtraPrice[] =
  [
    {
      expectedError: EXTRA_CATALOG_COPY.PRICE_FORMAT_ERROR,
      text: "abc",
    },
    {
      expectedError: EXTRA_CATALOG_COPY.PRICE_FORMAT_ERROR,
      text: "-5",
    },
    {
      expectedError:
        EXTRA_PRICE_ERROR_COPY[CURRENCY_CODE.USD][
          MONEY_AMOUNT_ISSUE.PRECISION
        ],
      text: "1.234",
    },
  ];

export const E2E_EXTRA_FORM_DUPLICATE_PADDING = "  ";

export const E2E_UNKNOWN_EXTRA_ID =
  "ffffffff-ffff-4fff-8fff-ffffffffffff";

export const E2E_MALFORMED_EXTRA_ID = "not-a-uuid";

export const E2E_BLANK_EXTRA_NAME = "   ";

export const E2E_ARIA_INVALID_ATTRIBUTE = "aria-invalid";

export const E2E_ARIA_INVALID_TRUE = "true";
