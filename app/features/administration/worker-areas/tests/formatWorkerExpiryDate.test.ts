import { describe, expect, it } from "vitest";
import { formatWorkerExpiryDate } from "../utils/formatWorkerExpiryDate";

const END_OF_DAY_CR = "2026-12-05T23:59:59-06:00";
const SPANISH_LONG_DATE = /5 de diciembre de 2026/;

describe("formatWorkerExpiryDate", () => {
  it("writes the Costa Rica calendar day in Spanish", () => {
    expect(formatWorkerExpiryDate(END_OF_DAY_CR)).toMatch(
      SPANISH_LONG_DATE
    );
  });
});
