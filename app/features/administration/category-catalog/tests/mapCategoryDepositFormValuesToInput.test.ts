import { describe, expect, it } from "vitest";
import { mapCategoryDepositFormValuesToInput } from "../utils/mapCategoryDepositFormValuesToInput";
import {
  buildCategoryDepositFormValues,
  CATEGORY_DEPOSIT_ID,
  DEFAULT_CATEGORY_DEPOSIT,
  EMPTY_CATEGORY_DEPOSIT_FORM_VALUES,
} from "./CategoryDepositFormValues.constants";

describe("mapCategoryDepositFormValuesToInput", () => {
  it("parses both amounts and passes the category id through", () => {
    expect(
      mapCategoryDepositFormValuesToInput(
        CATEGORY_DEPOSIT_ID,
        buildCategoryDepositFormValues()
      )
    ).toEqual({
      categoryId: CATEGORY_DEPOSIT_ID,
      depositUsd: DEFAULT_CATEGORY_DEPOSIT.depositUsd,
      depositCrc: DEFAULT_CATEGORY_DEPOSIT.depositCrc,
    });
  });

  it("sends null, never 0 or undefined, for blank fields", () => {
    const input = mapCategoryDepositFormValuesToInput(
      CATEGORY_DEPOSIT_ID,
      EMPTY_CATEGORY_DEPOSIT_FORM_VALUES
    );

    expect(input.depositUsd).toBeNull();
    expect(input.depositCrc).toBeNull();
  });

  it("keeps each currency independent", () => {
    const input = mapCategoryDepositFormValuesToInput(
      CATEGORY_DEPOSIT_ID,
      buildCategoryDepositFormValues({ depositCrc: "" })
    );

    expect(input.depositUsd).toBe(
      DEFAULT_CATEGORY_DEPOSIT.depositUsd
    );
    expect(input.depositCrc).toBeNull();
  });
});
