import { describe, expect, it } from "vitest";
import { mapChargeRow } from "../mapChargeRow";
import {
  CRC_SINPE_MOVEMENT,
  CRC_SINPE_ROW,
  USD_CARD_MOVEMENT,
  USD_CARD_ROW,
} from "./Charges.constants";

describe("mapChargeRow", () => {
  it("maps the snake_case payment method to the domain movement", () => {
    expect(mapChargeRow(USD_CARD_ROW)).toEqual(
      USD_CARD_MOVEMENT
    );
  });

  it("keeps the own currency and amount of each charge", () => {
    expect(mapChargeRow(CRC_SINPE_ROW)).toEqual(
      CRC_SINPE_MOVEMENT
    );
  });
});
