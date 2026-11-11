import { describe, expect, it } from "vitest";
import { DAILY_INCOME_COPY } from "../constants/DailyIncomeCopy.constants";
import { resolvePaymentMethodName } from "../utils/resolvePaymentMethodName";
import {
  BLANK_METHOD,
  NAMED_METHOD,
} from "./DailyIncomeUtils.constants";

describe("resolvePaymentMethodName", () => {
  it("shows the method as the worker typed it", () => {
    expect(resolvePaymentMethodName(NAMED_METHOD)).toBe(
      NAMED_METHOD.name
    );
  });

  it("shows the no-method copy for a blank method", () => {
    expect(resolvePaymentMethodName(BLANK_METHOD)).toBe(
      DAILY_INCOME_COPY.NO_PAYMENT_METHOD
    );
  });
});
