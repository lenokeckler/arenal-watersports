import { describe, expect, it } from "vitest";
import { DISPATCH_SHEET_ERROR } from "../constants/DispatchSheet.constants";
import { validateDispatchGroupInput } from "../utils/validateDispatchGroupInput";
import {
  DISPATCH_INPUT_FIXTURE,
  DISPATCH_TOO_MANY_UNITS,
} from "./DispatchSheetTest.constants";

const VALID_INPUT = {
  categoryId: DISPATCH_INPUT_FIXTURE.CATEGORY_ID,
  departureAt: DISPATCH_INPUT_FIXTURE.DEPARTURE_AT,
  reservationId: DISPATCH_INPUT_FIXTURE.RESERVATION_ID,
  returnsAt: DISPATCH_INPUT_FIXTURE.RETURNS_AT,
  unitIds: [DISPATCH_INPUT_FIXTURE.UNIT_ID],
};

describe("validateDispatchGroupInput", () => {
  it("accepts a well formed dispatch", () => {
    expect(() =>
      validateDispatchGroupInput(VALID_INPUT)
    ).not.toThrow();
  });

  it.each([
    [
      "a reservation that is not a uuid",
      { reservationId: DISPATCH_INPUT_FIXTURE.NOT_A_UUID },
    ],
    [
      "a category that is not a uuid",
      { categoryId: DISPATCH_INPUT_FIXTURE.NOT_A_UUID },
    ],
    [
      "a unit that is not a uuid",
      { unitIds: [DISPATCH_INPUT_FIXTURE.NOT_A_UUID] },
    ],
    [
      "too many units",
      { unitIds: DISPATCH_TOO_MANY_UNITS },
    ],
    [
      "a departure that is not a date",
      { departureAt: DISPATCH_INPUT_FIXTURE.NOT_A_DATE },
    ],
    [
      "a return that is not a date",
      { returnsAt: DISPATCH_INPUT_FIXTURE.NOT_A_DATE },
    ],
    [
      "a return before the departure",
      { returnsAt: DISPATCH_INPUT_FIXTURE.DEPARTURE_AT },
    ],
  ])("refuses %s", (_label, override) => {
    expect(() =>
      validateDispatchGroupInput({
        ...VALID_INPUT,
        ...override,
      })
    ).toThrow(DISPATCH_SHEET_ERROR.INVALID_INPUT);
  });
});
