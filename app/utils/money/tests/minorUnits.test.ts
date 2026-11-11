import { describe, expect, it } from "vitest";
import { fromMinorUnits } from "../fromMinorUnits";
import { toMinorUnits } from "../toMinorUnits";
import {
  CENTS_OF_TEN_CENTS,
  CENTS_OF_TWENTY_CENTS,
  CENTS_OF_WHOLE_AMOUNT,
  TEN_CENTS,
  THIRTY_CENTS,
  TWENTY_CENTS,
  WHOLE_AMOUNT,
} from "./minorUnits.constants";

describe("toMinorUnits", () => {
  it("turns an amount into whole cents", () => {
    expect(toMinorUnits(WHOLE_AMOUNT)).toBe(
      CENTS_OF_WHOLE_AMOUNT
    );
  });

  it("rounds the binary drift of a decimal amount away", () => {
    expect(toMinorUnits(TEN_CENTS)).toBe(
      CENTS_OF_TEN_CENTS
    );
  });
});

describe("fromMinorUnits", () => {
  it("sums decimal amounts exactly when added in cents", () => {
    expect(
      fromMinorUnits(
        CENTS_OF_TEN_CENTS + CENTS_OF_TWENTY_CENTS
      )
    ).toBe(THIRTY_CENTS);
  });

  it("turns whole cents back into the amount", () => {
    expect(fromMinorUnits(CENTS_OF_TWENTY_CENTS)).toBe(
      TWENTY_CENTS
    );
  });
});
