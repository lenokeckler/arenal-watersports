import { describe, expect, it } from "vitest";
import { mapDepositRow } from "../mapDepositRow";
import {
  CRC_DEPOSIT_ITEM,
  CRC_DEPOSIT_ROW,
  USD_DEPOSIT_ITEM,
  USD_DEPOSIT_ROW,
} from "./Deposits.constants";

describe("mapDepositRow", () => {
  it("maps the snake_case reservation embed to the domain item", () => {
    expect(mapDepositRow(USD_DEPOSIT_ROW)).toEqual(
      USD_DEPOSIT_ITEM
    );
  });

  it("keeps the own currency and the cents of each deposit", () => {
    expect(mapDepositRow(CRC_DEPOSIT_ROW)).toEqual(
      CRC_DEPOSIT_ITEM
    );
  });
});
