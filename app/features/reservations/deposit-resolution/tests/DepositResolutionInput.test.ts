import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as COPY } from "../constants/DepositResolutionValidationCopy.constants";
import { buildDepositResolutionCommand } from "../utils/buildDepositResolutionCommand";
import { isDepositResolutionInput } from "../utils/isDepositResolutionInput";
import { resolveDepositResolutionInputErrors } from "../utils/resolveDepositResolutionInputErrors";
import { toDepositResolutionInput } from "../utils/toDepositResolutionInput";
import {
  CLOSED_DEPOSIT,
  DAMAGE_REASON,
  MALFORMED_DEPOSIT_ID,
  PARTIAL_VALUES,
  RESOLUTION_DEPOSIT_ID,
} from "./DepositResolution.constants";

const NON_BREAKING_SPACE = String.fromCharCode(0xa0);

const PARTIAL_INPUT = {
  depositId: RESOLUTION_DEPOSIT_ID,
  reasonText: DAMAGE_REASON,
  returnedText: "100",
};

describe("toDepositResolutionInput", () => {
  it("sends the whole deposit and no reason when everything goes back", () => {
    expect(
      toDepositResolutionInput(
        { ...PARTIAL_VALUES, returnsAll: true },
        CLOSED_DEPOSIT
      )
    ).toEqual({
      depositId: RESOLUTION_DEPOSIT_ID,
      reasonText: STRING.Empty,
      returnedText: "200",
    });
  });

  it("sends the typed amount and reason otherwise", () => {
    expect(
      toDepositResolutionInput(
        PARTIAL_VALUES,
        CLOSED_DEPOSIT
      )
    ).toEqual(PARTIAL_INPUT);
  });
});

describe("isDepositResolutionInput", () => {
  it("accepts a well formed input", () => {
    expect(isDepositResolutionInput(PARTIAL_INPUT)).toBe(
      true
    );
  });

  it.each([
    ["null", null],
    ["a string", "resolve"],
    [
      "a malformed id",
      { ...PARTIAL_INPUT, depositId: MALFORMED_DEPOSIT_ID },
    ],
    [
      "a numeric amount",
      { ...PARTIAL_INPUT, returnedText: 100 },
    ],
    [
      "a missing reason",
      { ...PARTIAL_INPUT, reasonText: undefined },
    ],
  ])("refuses %s", (_, input) => {
    expect(isDepositResolutionInput(input)).toBe(false);
  });
});

describe("buildDepositResolutionCommand", () => {
  it("parses the amount and trims the reason", () => {
    expect(
      buildDepositResolutionCommand({
        ...PARTIAL_INPUT,
        reasonText: `  ${DAMAGE_REASON}${NON_BREAKING_SPACE}`,
        returnedText: " 99,5 ",
      })
    ).toEqual({
      depositId: RESOLUTION_DEPOSIT_ID,
      reason: DAMAGE_REASON,
      returnedAmount: 99.5,
    });
  });

  it("sends no reason when none was written", () => {
    expect(
      buildDepositResolutionCommand({
        ...PARTIAL_INPUT,
        reasonText: " ",
      }).reason
    ).toBeNull();
  });
});

describe("resolveDepositResolutionInputErrors", () => {
  it("checks the format on the server without the deposit", () => {
    expect(
      resolveDepositResolutionInputErrors({
        ...PARTIAL_INPUT,
        returnedText: STRING.Empty,
      })
    ).toEqual({ returned: COPY.RETURNED_REQUIRED });
    expect(
      resolveDepositResolutionInputErrors({
        ...PARTIAL_INPUT,
        reasonText: STRING.Empty,
      })
    ).toEqual({});
  });
});
