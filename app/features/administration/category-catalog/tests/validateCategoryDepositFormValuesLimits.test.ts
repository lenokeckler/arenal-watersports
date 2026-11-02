import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
} from "@/app/constants";
import { CATEGORY_DEPOSIT_ERROR_COPY } from "../constants/CategoryDepositErrorCopy.constants";
import { validateCategoryDepositFormValues } from "../utils/validateCategoryDepositFormValues";
import {
  buildCategoryDepositFormValues,
  ELEVEN_INTEGER_DIGITS_TEXT,
  THIRTEEN_INTEGER_DIGITS_TEXT,
} from "./CategoryDepositFormValues.constants";

describe("validateCategoryDepositFormValues limits", () => {
  it("rejects a USD amount with more integer digits than USD allows", () => {
    expect(
      validateCategoryDepositFormValues(
        buildCategoryDepositFormValues({
          depositUsd: ELEVEN_INTEGER_DIGITS_TEXT,
        })
      )
    ).toEqual({
      depositUsd:
        CATEGORY_DEPOSIT_ERROR_COPY[CURRENCY_CODE.USD][
          MONEY_AMOUNT_ISSUE.PRECISION
        ],
    });
  });

  it("accepts in CRC an amount too long for USD", () => {
    expect(
      validateCategoryDepositFormValues(
        buildCategoryDepositFormValues({
          depositCrc: ELEVEN_INTEGER_DIGITS_TEXT,
        })
      )
    ).toEqual({});
  });

  it("rejects a CRC amount with more integer digits than CRC allows", () => {
    expect(
      validateCategoryDepositFormValues(
        buildCategoryDepositFormValues({
          depositCrc: THIRTEEN_INTEGER_DIGITS_TEXT,
        })
      )
    ).toEqual({
      depositCrc:
        CATEGORY_DEPOSIT_ERROR_COPY[CURRENCY_CODE.CRC][
          MONEY_AMOUNT_ISSUE.PRECISION
        ],
    });
  });
});
