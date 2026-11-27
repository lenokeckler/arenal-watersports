import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { DEPOSIT_RESOLUTION_LIMITS } from "../constants/DepositResolutionLimits.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as COPY } from "../constants/DepositResolutionValidationCopy.constants";
import { resolveDepositResolutionErrors } from "../utils/resolveDepositResolutionErrors";
import { resolveDepositResolutionKept } from "../utils/resolveDepositResolutionKept";
import { resolveDepositResolutionReturnedError } from "../utils/resolveDepositResolutionReturnedError";
import {
  CLOSED_DEPOSIT,
  PARTIAL_VALUES,
} from "./DepositResolution.constants";

const { USD } = CURRENCY_CODE;

describe("resolveDepositResolutionReturnedError", () => {
  it.each([
    ["empty", "", COPY.RETURNED_REQUIRED],
    ["letters", "abc", COPY.RETURNED.format],
    ["a negative sign", "-5", COPY.RETURNED.format],
    [
      "three decimals",
      "1.234",
      COPY.RETURNED_TOO_MANY_DECIMALS,
    ],
    [
      "more than the deposit",
      "200.01",
      COPY.RETURNED_ABOVE_DEPOSIT(
        formatMoney({ amount: 200, currency: USD })
      ),
    ],
  ])("refuses %s", (_, text, expected) => {
    expect(
      resolveDepositResolutionReturnedError(
        text,
        CLOSED_DEPOSIT
      )
    ).toBe(expected);
  });

  it.each([
    ["zero, when nothing goes back", "0"],
    ["part of the deposit", "100"],
    ["a comma decimal", "99,50"],
    ["the whole deposit", "200.00"],
  ])("accepts %s", (_, text) => {
    expect(
      resolveDepositResolutionReturnedError(
        text,
        CLOSED_DEPOSIT
      )
    ).toBeUndefined();
  });

  it("checks only the format when the deposit is unknown", () => {
    expect(
      resolveDepositResolutionReturnedError("999999")
    ).toBeUndefined();
    expect(
      resolveDepositResolutionReturnedError(
        "1".repeat(
          DEPOSIT_RESOLUTION_LIMITS.AMOUNT.CRC
            .maxIntegerDigits + 1
        )
      )
    ).toBe(COPY.RETURNED.precision);
  });
});

describe("resolveDepositResolutionKept", () => {
  it.each([
    [
      "everything back",
      { ...PARTIAL_VALUES, returnsAll: true },
      0,
    ],
    ["part back", PARTIAL_VALUES, 100],
    [
      "nothing back",
      { ...PARTIAL_VALUES, returnedText: "0" },
      200,
    ],
    [
      "cents back",
      { ...PARTIAL_VALUES, returnedText: "0.1" },
      199.9,
    ],
    [
      "an invalid amount",
      { ...PARTIAL_VALUES, returnedText: "abc" },
      null,
    ],
  ])("keeps the difference with %s", (_, values, kept) => {
    expect(
      resolveDepositResolutionKept(values, CLOSED_DEPOSIT)
    ).toBe(kept);
  });
});

describe("resolveDepositResolutionErrors", () => {
  it("has no errors when everything goes back", () => {
    expect(
      resolveDepositResolutionErrors(
        {
          reasonText: STRING.Empty,
          returnedText: "abc",
          returnsAll: true,
        },
        CLOSED_DEPOSIT
      )
    ).toEqual({});
  });

  it("asks for the reason only when the company keeps something", () => {
    expect(
      resolveDepositResolutionErrors(
        { ...PARTIAL_VALUES, reasonText: STRING.Empty },
        CLOSED_DEPOSIT
      )
    ).toEqual({ reason: COPY.REASON_REQUIRED });
    expect(
      resolveDepositResolutionErrors(
        {
          ...PARTIAL_VALUES,
          reasonText: STRING.Empty,
          returnedText: "200",
        },
        CLOSED_DEPOSIT
      )
    ).toEqual({});
  });

  it("refuses a reason that is too long", () => {
    expect(
      resolveDepositResolutionErrors(
        {
          ...PARTIAL_VALUES,
          reasonText: "a".repeat(
            DEPOSIT_RESOLUTION_LIMITS.REASON_MAX_LENGTH + 1
          ),
        },
        CLOSED_DEPOSIT
      )
    ).toEqual({ reason: COPY.REASON_TOO_LONG });
  });

  it("refuses control characters in the reason", () => {
    expect(
      resolveDepositResolutionErrors(
        { ...PARTIAL_VALUES, reasonText: "Daño\u0007" },
        CLOSED_DEPOSIT
      )
    ).toEqual({
      reason: COPY.REASON_DISALLOWED_CHARACTERS,
    });
  });

  it("reports the amount without asking a reason it cannot judge", () => {
    expect(
      resolveDepositResolutionErrors(
        {
          ...PARTIAL_VALUES,
          reasonText: STRING.Empty,
          returnedText: "abc",
        },
        CLOSED_DEPOSIT
      )
    ).toEqual({ returned: COPY.RETURNED.format });
  });
});
