import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
  STRING,
} from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_PRICE_ERROR_COPY } from "../constants/ExtraPriceErrorCopy.constants";
import type { ExtraPriceInputCase } from "./models/ExtraPriceInputCase.interface";
import { FAKE_EXTRA_NAME } from "./Extra.constants";

export const FAKE_EXTRA_ADMIN_WORKER_ID =
  "fake-extra-admin-worker-id";
export const EXTRAS_TABLE = "extras";
export const EXTRA_ID_COLUMN = "id";
export const EXTRA_NAME_COLUMN = "name";
export const EXTRA_STATUS_COLUMN = "status";
export const PADDED_EXTRA_NAME = `  ${FAKE_EXTRA_NAME}  `;
export const BLANK_EXTRA_NAME = "   ";
export const SERVER_ERROR_CODE = "500";
export const ZERO_PRICE_TEXT = "0";
export const DECIMAL_POINT = ".";
export const DECIMAL_COMMA = ",";
export const INVALID_UUID_MESSAGE =
  "invalid input syntax for type uuid";
export const NON_STRING_EXTRA_NAMES: readonly unknown[] = [
  null,
  undefined,
  42,
  true,
  {},
  ["extra"],
];
export const NON_STRING_EXTRA_PRICES: readonly unknown[] = [
  42,
  true,
  {},
  ["25"],
];

export const INVALID_PRICE_INPUT_CASES: ExtraPriceInputCase[] =
  [
    {
      description: "neither price is given",
      values: {
        priceUsd: STRING.Empty,
        priceCrc: STRING.Empty,
      },
      expectedErrors: {
        prices: EXTRA_CATALOG_COPY.PRICES_REQUIRED_ERROR,
      },
    },
    {
      description: "the dollar price is text",
      values: { priceUsd: "abc" },
      expectedErrors: {
        priceUsd:
          EXTRA_PRICE_ERROR_COPY[CURRENCY_CODE.USD][
            MONEY_AMOUNT_ISSUE.FORMAT
          ],
      },
    },
    {
      description: "the colon price is negative",
      values: { priceUsd: "5", priceCrc: "-5" },
      expectedErrors: {
        priceCrc:
          EXTRA_PRICE_ERROR_COPY[CURRENCY_CODE.CRC][
            MONEY_AMOUNT_ISSUE.FORMAT
          ],
      },
    },
    {
      description: "the dollar price has three decimals",
      values: { priceUsd: "1.234" },
      expectedErrors: {
        priceUsd:
          EXTRA_PRICE_ERROR_COPY[CURRENCY_CODE.USD][
            MONEY_AMOUNT_ISSUE.PRECISION
          ],
      },
    },
  ];
