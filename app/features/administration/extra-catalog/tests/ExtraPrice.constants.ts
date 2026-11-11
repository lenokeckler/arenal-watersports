import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
} from "@/app/constants";
import { EXTRA_PRICE_ERROR_COPY } from "../constants/ExtraPriceErrorCopy.constants";
import type { ExtraPriceTextCase } from "./models/ExtraPriceTextCase.interface";

export const ACCEPTED_PRICE_TEXT_CASES: ExtraPriceTextCase[] =
  [
    {
      currency: CURRENCY_CODE.USD,
      text: "0",
      expectedError: undefined,
    },
    {
      currency: CURRENCY_CODE.USD,
      text: "25",
      expectedError: undefined,
    },
    {
      currency: CURRENCY_CODE.USD,
      text: "25.5",
      expectedError: undefined,
    },
    {
      currency: CURRENCY_CODE.USD,
      text: "25,50",
      expectedError: undefined,
    },
    {
      currency: CURRENCY_CODE.USD,
      text: "  25  ",
      expectedError: undefined,
    },
    {
      currency: CURRENCY_CODE.USD,
      text: "9999999999.99",
      expectedError: undefined,
    },
    {
      currency: CURRENCY_CODE.CRC,
      text: "999999999999.99",
      expectedError: undefined,
    },
  ];

export const REJECTED_PRICE_TEXT_CASES: ExtraPriceTextCase[] =
  [
    ...[
      "abc",
      "-5",
      "1.2.3",
      "1 000",
      "$25",
      "25.",
      ".5",
    ].map((text) => ({
      currency: CURRENCY_CODE.USD,
      text,
      expectedError:
        EXTRA_PRICE_ERROR_COPY[CURRENCY_CODE.USD][
          MONEY_AMOUNT_ISSUE.FORMAT
        ],
    })),
    {
      currency: CURRENCY_CODE.CRC,
      text: "-0.01",
      expectedError:
        EXTRA_PRICE_ERROR_COPY[CURRENCY_CODE.CRC][
          MONEY_AMOUNT_ISSUE.FORMAT
        ],
    },
    {
      currency: CURRENCY_CODE.USD,
      text: "1.234",
      expectedError:
        EXTRA_PRICE_ERROR_COPY[CURRENCY_CODE.USD][
          MONEY_AMOUNT_ISSUE.PRECISION
        ],
    },
    {
      currency: CURRENCY_CODE.USD,
      text: "10000000000",
      expectedError:
        EXTRA_PRICE_ERROR_COPY[CURRENCY_CODE.USD][
          MONEY_AMOUNT_ISSUE.PRECISION
        ],
    },
    {
      currency: CURRENCY_CODE.CRC,
      text: "1000000000000",
      expectedError:
        EXTRA_PRICE_ERROR_COPY[CURRENCY_CODE.CRC][
          MONEY_AMOUNT_ISSUE.PRECISION
        ],
    },
  ];
