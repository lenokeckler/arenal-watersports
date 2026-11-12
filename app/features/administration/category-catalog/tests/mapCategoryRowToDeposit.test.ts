import { describe, expect, it } from "vitest";
import { mapCategoryRowToDeposit } from "../utils/mapCategoryRowToDeposit";
import {
  buildCategoryDeposit,
  CATEGORY_DEPOSIT_ID,
  DEFAULT_CATEGORY_DEPOSIT,
} from "./CategoryDepositFormValues.constants";
import {
  buildCategoryDepositRow,
  DEFAULT_CATEGORY_DEPOSIT_ROW,
} from "./CategoryDepositRow.constants";

describe("mapCategoryRowToDeposit", () => {
  it("maps each deposit column to its own field", () => {
    expect(
      mapCategoryRowToDeposit(DEFAULT_CATEGORY_DEPOSIT_ROW)
    ).toEqual(DEFAULT_CATEGORY_DEPOSIT);
  });

  it("keeps null columns as null, never 0", () => {
    const deposit = mapCategoryRowToDeposit(
      buildCategoryDepositRow({
        deposit_crc: null,
        deposit_usd: null,
      })
    );

    expect(deposit).toEqual(
      buildCategoryDeposit({
        depositCrc: null,
        depositUsd: null,
      })
    );
    expect(deposit.id).toBe(CATEGORY_DEPOSIT_ID);
  });
});
