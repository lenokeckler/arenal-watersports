import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { useCategoryDepositFormFields } from "../hooks/useCategoryDepositFormFields";
import type { CategoryDeposit } from "../models/CategoryDeposit.interface";
import { buildCategoryFormFieldChangeEvent } from "./buildCategoryFormFieldChangeEvent";
import {
  buildCategoryDeposit,
  buildCategoryDepositFormValues,
  CATEGORY_DEPOSIT_FIELD_BY_CURRENCY,
  DECIMAL_DEPOSIT_TEXT,
  DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
  EMPTY_CATEGORY_DEPOSIT_FORM_VALUES,
} from "./CategoryDepositFormValues.constants";
import {
  CHANGE_HANDLER_BY_CURRENCY,
  FORMAT_ERRORS,
} from "./useCategoryDepositForm.constants";

const CURRENCY_CASES = Object.values(CURRENCY_CODE).map(
  (currency) => ({
    currency,
    field: CATEGORY_DEPOSIT_FIELD_BY_CURRENCY[currency],
    change: CHANGE_HANDLER_BY_CURRENCY[currency],
    otherField:
      CATEGORY_DEPOSIT_FIELD_BY_CURRENCY[
        currency === CURRENCY_CODE.USD
          ? CURRENCY_CODE.CRC
          : CURRENCY_CODE.USD
      ],
  })
);

const renderFields = (
  overrides: Partial<CategoryDeposit> = {}
) =>
  renderHook(() =>
    useCategoryDepositFormFields({
      deposit: buildCategoryDeposit(overrides),
    })
  );

describe("useCategoryDepositFormFields", () => {
  it.each([
    {
      description: "the deposit amounts",
      overrides: {},
      values: DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
    },
    {
      description: "an empty text for a missing deposit",
      overrides: { depositCrc: null, depositUsd: null },
      values: EMPTY_CATEGORY_DEPOSIT_FORM_VALUES,
    },
  ])(
    "seeds $description and starts without errors",
    ({ overrides, values }) => {
      const { result } = renderFields(overrides);

      expect(result.current.values).toStrictEqual(values);
      expect(result.current.errors).toStrictEqual({});
    }
  );

  it.each(CURRENCY_CASES)(
    "changes only the $currency value",
    ({ field, change }) => {
      const { result } = renderFields();

      act(() => {
        result.current[change](
          buildCategoryFormFieldChangeEvent({
            value: DECIMAL_DEPOSIT_TEXT,
          })
        );
      });

      expect(result.current.values).toStrictEqual(
        buildCategoryDepositFormValues({
          [field]: DECIMAL_DEPOSIT_TEXT,
        })
      );
    }
  );

  it.each(CURRENCY_CASES)(
    "clears only the $currency error when that field changes",
    ({ change, otherField }) => {
      const { result } = renderFields();
      act(() => {
        result.current.showValidationErrors(FORMAT_ERRORS);
      });

      act(() => {
        result.current[change](
          buildCategoryFormFieldChangeEvent({
            value: STRING.Empty,
          })
        );
      });

      expect(result.current.errors).toStrictEqual({
        [otherField]: FORMAT_ERRORS[otherField],
      });
    }
  );

  it.each(CURRENCY_CASES)(
    "keeps the same errors when the $currency field has none",
    ({ change, otherField }) => {
      const { result } = renderFields();
      act(() => {
        result.current.showValidationErrors({
          [otherField]: FORMAT_ERRORS[otherField],
        });
      });
      const errorsBeforeChange = result.current.errors;

      act(() => {
        result.current[change](
          buildCategoryFormFieldChangeEvent({
            value: DECIMAL_DEPOSIT_TEXT,
          })
        );
      });

      expect(result.current.errors).toBe(
        errorsBeforeChange
      );
    }
  );
});
