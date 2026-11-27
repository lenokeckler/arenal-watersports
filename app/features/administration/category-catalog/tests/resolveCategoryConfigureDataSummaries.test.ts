import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { resolveAlertsSummary } from "../utils/resolveAlertsSummary";
import { resolveDepositSummary } from "../utils/resolveDepositSummary";
import { resolveTraitsSummary } from "../utils/resolveTraitsSummary";
import {
  DEFAULT_CATEGORY_CONFIGURATION,
  FAKE_CONFIGURATION_ALERT_EXPIRY_DAYS,
  FAKE_CONFIGURATION_ALERT_QUANTITY,
  FAKE_CONFIGURATION_DEPOSIT_CRC,
  FAKE_CONFIGURATION_DEPOSIT_USD,
} from "./CategoryConfiguration.constants";

const { behavior, deposit, alerts } =
  DEFAULT_CATEGORY_CONFIGURATION;
const SINGLE_DAY = 1;

describe("resolveDepositSummary", () => {
  it.each([
    {
      scenario: "no deposit",
      input: deposit,
      expected: CATEGORY_CONFIGURE_COPY.DEPOSIT_NONE,
    },
    {
      scenario: "dollars only",
      input: {
        ...deposit,
        depositUsd: FAKE_CONFIGURATION_DEPOSIT_USD,
      },
      expected: "USD 50 · sin colones",
    },
    {
      scenario: "colones only",
      input: {
        ...deposit,
        depositCrc: FAKE_CONFIGURATION_DEPOSIT_CRC,
      },
      expected: "sin dólares · CRC 25000",
    },
    {
      scenario: "both currencies",
      input: {
        ...deposit,
        depositUsd: FAKE_CONFIGURATION_DEPOSIT_USD,
        depositCrc: FAKE_CONFIGURATION_DEPOSIT_CRC,
      },
      expected: "USD 50 · CRC 25000",
    },
  ])("$scenario", ({ input, expected }) => {
    expect(resolveDepositSummary(input)).toBe(expected);
  });
});

describe("resolveAlertsSummary", () => {
  it.each([
    {
      scenario: "no alert",
      input: alerts,
      expected: CATEGORY_CONFIGURE_COPY.ALERTS_NONE,
    },
    {
      scenario: "by quantity",
      input: {
        ...alerts,
        alertMinQuantity: FAKE_CONFIGURATION_ALERT_QUANTITY,
      },
      expected: "Pocas existencias: 5",
    },
    {
      scenario: "by expiry",
      input: {
        ...alerts,
        alertExpiryDays:
          FAKE_CONFIGURATION_ALERT_EXPIRY_DAYS,
      },
      expected: "Vencimiento: 30 días",
    },
    {
      scenario: "by one day of expiry",
      input: { ...alerts, alertExpiryDays: SINGLE_DAY },
      expected: "Vencimiento: 1 día",
    },
    {
      scenario: "by both",
      input: {
        ...alerts,
        alertMinQuantity: FAKE_CONFIGURATION_ALERT_QUANTITY,
        alertExpiryDays:
          FAKE_CONFIGURATION_ALERT_EXPIRY_DAYS,
      },
      expected:
        "Pocas existencias: 5 · Vencimiento: 30 días",
    },
  ])("$scenario", ({ input, expected }) => {
    expect(resolveAlertsSummary(input)).toBe(expected);
  });
});

describe("resolveTraitsSummary", () => {
  it.each([
    {
      scenario: "no trait",
      input: {
        ...behavior,
        hasMotor: false,
        consumesFuel: false,
        canBeDamaged: false,
        hasConditionPhotos: false,
      },
      expected: CATEGORY_CONFIGURE_COPY.TRAITS_NONE,
    },
    {
      scenario: "every trait",
      input: {
        ...behavior,
        hasMotor: true,
        consumesFuel: true,
        canBeDamaged: true,
        hasConditionPhotos: true,
      },
      expected:
        "Con motor · combustible · puede dañarse · fotos de estado",
    },
  ])("$scenario", ({ input, expected }) => {
    expect(resolveTraitsSummary(input)).toBe(expected);
  });
});
