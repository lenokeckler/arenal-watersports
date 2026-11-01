import { describe, expect, it } from "vitest";
import { mapCategoryDepositFormValuesToInput } from "../utils/mapCategoryDepositFormValuesToInput";
import { mapCategoryDepositToFormValues } from "../utils/mapCategoryDepositToFormValues";
import {
  buildCategoryDeposit,
  buildCategoryDepositFormValues,
  CATEGORY_DEPOSIT_ID,
  DECIMAL_DEPOSIT,
  DECIMAL_DEPOSIT_TEXT,
  EMPTY_CATEGORY_DEPOSIT_FORM_VALUES,
} from "./CategoryDepositFormValues.constants";

describe("mapCategoryDepositToFormValues", () => {
  it("renders a category without deposit as empty fields", () => {
    expect(
      mapCategoryDepositToFormValues(
        buildCategoryDeposit({
          depositUsd: null,
          depositCrc: null,
        })
      )
    ).toEqual(EMPTY_CATEGORY_DEPOSIT_FORM_VALUES);
  });

  it("renders whole amounts without decimals", () => {
    expect(
      mapCategoryDepositToFormValues(buildCategoryDeposit())
    ).toEqual(buildCategoryDepositFormValues());
  });

  it("renders decimal amounts", () => {
    expect(
      mapCategoryDepositToFormValues(
        buildCategoryDeposit({
          depositUsd: DECIMAL_DEPOSIT,
        })
      ).depositUsd
    ).toBe(DECIMAL_DEPOSIT_TEXT);
  });

  it("round-trips deposit to form to input", () => {
    const deposit = buildCategoryDeposit({
      depositUsd: DECIMAL_DEPOSIT,
    });

    expect(
      mapCategoryDepositFormValuesToInput(
        CATEGORY_DEPOSIT_ID,
        mapCategoryDepositToFormValues(deposit)
      )
    ).toEqual({
      categoryId: CATEGORY_DEPOSIT_ID,
      depositUsd: deposit.depositUsd,
      depositCrc: deposit.depositCrc,
    });
  });

  it("round-trips form to input to form", () => {
    const values = buildCategoryDepositFormValues({
      depositUsd: DECIMAL_DEPOSIT_TEXT,
      depositCrc: "",
    });
    const input = mapCategoryDepositFormValuesToInput(
      CATEGORY_DEPOSIT_ID,
      values
    );

    expect(
      mapCategoryDepositToFormValues({
        id: input.categoryId,
        depositUsd: input.depositUsd,
        depositCrc: input.depositCrc,
      })
    ).toStrictEqual(values);
  });
});
