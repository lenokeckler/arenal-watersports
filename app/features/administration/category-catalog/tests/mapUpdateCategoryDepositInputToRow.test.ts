import { describe, expect, it } from "vitest";
import { mapUpdateCategoryDepositInputToRow } from "../utils/mapUpdateCategoryDepositInputToRow";
import { DEFAULT_CATEGORY_DEPOSIT } from "./CategoryDepositFormValues.constants";
import {
  buildUpdateCategoryDepositInput,
  FAKE_DEPOSIT_ADMIN_WORKER_ID,
  INPUT_WITHOUT_AMOUNTS,
} from "./UpdateCategoryDepositInput.constants";
import { DEPOSIT_ROW_COLUMNS } from "./CategoryDepositRow.constants";

describe("mapUpdateCategoryDepositInputToRow", () => {
  it("maps both amounts and stamps the admin as updater", () => {
    const row = mapUpdateCategoryDepositInputToRow(
      buildUpdateCategoryDepositInput(),
      FAKE_DEPOSIT_ADMIN_WORKER_ID
    );

    expect(row).toEqual({
      deposit_crc: DEFAULT_CATEGORY_DEPOSIT.depositCrc,
      deposit_usd: DEFAULT_CATEGORY_DEPOSIT.depositUsd,
      updated_by: FAKE_DEPOSIT_ADMIN_WORKER_ID,
    });
  });

  it.each([
    ["depositUsd", "deposit_usd"],
    ["depositCrc", "deposit_crc"],
  ] as const)(
    "sends a cleared %s as an explicit null in %s",
    (field, column) => {
      const row = mapUpdateCategoryDepositInputToRow(
        buildUpdateCategoryDepositInput({ [field]: null }),
        FAKE_DEPOSIT_ADMIN_WORKER_ID
      );

      expect(row).toHaveProperty(column, null);
    }
  );

  it("clears both amounts when the payload omits them", () => {
    const row = mapUpdateCategoryDepositInputToRow(
      INPUT_WITHOUT_AMOUNTS,
      FAKE_DEPOSIT_ADMIN_WORKER_ID
    );

    expect(row).toEqual({
      deposit_crc: null,
      deposit_usd: null,
      updated_by: FAKE_DEPOSIT_ADMIN_WORKER_ID,
    });
  });

  it("writes only the deposit columns and the updater", () => {
    const row = mapUpdateCategoryDepositInputToRow(
      buildUpdateCategoryDepositInput(),
      FAKE_DEPOSIT_ADMIN_WORKER_ID
    );

    expect(Object.keys(row).sort()).toEqual(
      DEPOSIT_ROW_COLUMNS
    );
  });
});
