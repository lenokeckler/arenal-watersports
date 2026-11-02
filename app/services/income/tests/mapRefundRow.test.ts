import { describe, expect, it } from "vitest";
import { mapRefundRow } from "../mapRefundRow";
import {
  CRC_MOVEMENT,
  CRC_ROW,
  USD_MOVEMENT,
  USD_ROW,
} from "./Refunds.constants";

describe("mapRefundRow", () => {
  it("maps the row to a money amount in its own currency", () => {
    expect(mapRefundRow(USD_ROW)).toEqual(USD_MOVEMENT);
  });

  it("keeps the own currency and amount of each refund", () => {
    expect(mapRefundRow(CRC_ROW)).toEqual(CRC_MOVEMENT);
  });
});
