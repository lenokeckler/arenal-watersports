import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
} from "@/app/constants";
import { CATEGORY_DEPOSIT_ERROR_COPY } from "../constants/CategoryDepositErrorCopy.constants";
import { validateCategoryDepositFormValues } from "../utils/validateCategoryDepositFormValues";
import {
  BLANK_TEXT,
  buildCategoryDepositFormValues,
  DEPOSIT_ISSUE_CASES,
  EMPTY_CATEGORY_DEPOSIT_FORM_VALUES,
  INVALID_FORMAT_TEXT,
  PADDED_VALID_TEXT,
} from "./CategoryDepositFormValues.constants";

describe("validateCategoryDepositFormValues", () => {
  it("treats a category with both fields empty as having no deposit", () => {
    expect(
      validateCategoryDepositFormValues(
        EMPTY_CATEGORY_DEPOSIT_FORM_VALUES
      )
    ).toEqual({});
  });

  it("accepts a valid amount in each currency", () => {
    expect(
      validateCategoryDepositFormValues(
        buildCategoryDepositFormValues()
      )
    ).toEqual({});
  });

  it("accepts a USD deposit without a CRC one", () => {
    expect(
      validateCategoryDepositFormValues(
        buildCategoryDepositFormValues({ depositCrc: "" })
      )
    ).toEqual({});
  });

  it("accepts a CRC deposit without a USD one", () => {
    expect(
      validateCategoryDepositFormValues(
        buildCategoryDepositFormValues({ depositUsd: "" })
      )
    ).toEqual({});
  });

  it("reads whitespace-only fields as no deposit", () => {
    expect(
      validateCategoryDepositFormValues({
        depositUsd: BLANK_TEXT,
        depositCrc: BLANK_TEXT,
      })
    ).toEqual({});
  });

  it("ignores spaces around a valid amount", () => {
    expect(
      validateCategoryDepositFormValues(
        buildCategoryDepositFormValues({
          depositUsd: PADDED_VALID_TEXT,
        })
      )
    ).toEqual({});
  });

  it.each(DEPOSIT_ISSUE_CASES)(
    "reports $description in $currency on its own field only",
    ({ amountText, currency, field, issue }) => {
      expect(
        validateCategoryDepositFormValues(
          buildCategoryDepositFormValues({
            [field]: amountText,
          })
        )
      ).toEqual({
        [field]:
          CATEGORY_DEPOSIT_ERROR_COPY[currency][issue],
      });
    }
  );

  it("reports each field independently when both are invalid", () => {
    expect(
      validateCategoryDepositFormValues({
        depositUsd: INVALID_FORMAT_TEXT,
        depositCrc: INVALID_FORMAT_TEXT,
      })
    ).toEqual({
      depositUsd:
        CATEGORY_DEPOSIT_ERROR_COPY[CURRENCY_CODE.USD][
          MONEY_AMOUNT_ISSUE.FORMAT
        ],
      depositCrc:
        CATEGORY_DEPOSIT_ERROR_COPY[CURRENCY_CODE.CRC][
          MONEY_AMOUNT_ISSUE.FORMAT
        ],
    });
  });
});
