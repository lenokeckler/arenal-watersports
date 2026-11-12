import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
} from "@/app/constants";
import { CATEGORY_DEPOSIT_ERROR_COPY } from "../constants/CategoryDepositErrorCopy.constants";
import type { CategoryDepositFormErrors } from "../models/CategoryDepositFormErrors.interface";
import { validateCategoryDepositFormValues } from "../utils/validateCategoryDepositFormValues";
import { CATEGORY_DEPOSIT_BOUNDARY_CASES } from "./CategoryDepositBoundaries.constants";
import {
  BLANK_TEXT,
  buildCategoryDepositFormValues,
  CATEGORY_DEPOSIT_FIELD_BY_CURRENCY,
  EMPTY_CATEGORY_DEPOSIT_FORM_VALUES,
  INVALID_FORMAT_TEXT,
} from "./CategoryDepositFormValues.constants";

describe("validateCategoryDepositFormValues boundaries", () => {
  it.each(CATEGORY_DEPOSIT_BOUNDARY_CASES)(
    "judges $description",
    ({ currency, amountText, expectedIssue }) => {
      const field =
        CATEGORY_DEPOSIT_FIELD_BY_CURRENCY[currency];
      const expectedErrors: CategoryDepositFormErrors =
        expectedIssue
          ? {
              [field]:
                CATEGORY_DEPOSIT_ERROR_COPY[currency][
                  expectedIssue
                ],
            }
          : {};

      expect(
        validateCategoryDepositFormValues(
          buildCategoryDepositFormValues({
            [field]: amountText,
          })
        )
      ).toStrictEqual(expectedErrors);
    }
  );

  it("returns no keys at all when nothing is wrong", () => {
    expect(
      Object.keys(
        validateCategoryDepositFormValues(
          EMPTY_CATEGORY_DEPOSIT_FORM_VALUES
        )
      )
    ).toHaveLength(0);
  });

  it("judges the trimmed text of an invalid field", () => {
    expect(
      validateCategoryDepositFormValues(
        buildCategoryDepositFormValues({
          depositCrc: ` ${INVALID_FORMAT_TEXT} `,
        })
      )
    ).toStrictEqual({
      depositCrc:
        CATEGORY_DEPOSIT_ERROR_COPY[CURRENCY_CODE.CRC][
          MONEY_AMOUNT_ISSUE.FORMAT
        ],
    });
  });

  it("does not report a blank field next to an invalid one", () => {
    expect(
      validateCategoryDepositFormValues({
        depositUsd: BLANK_TEXT,
        depositCrc: INVALID_FORMAT_TEXT,
      })
    ).toStrictEqual({
      depositCrc:
        CATEGORY_DEPOSIT_ERROR_COPY[CURRENCY_CODE.CRC][
          MONEY_AMOUNT_ISSUE.FORMAT
        ],
    });
  });
});
