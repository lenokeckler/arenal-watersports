import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { buildIncomeTitleId } from "../utils/buildIncomeTitleId";
import { EXPECTED_DOLLAR_TITLE_ID } from "./IncomeUtils.constants";

describe("buildIncomeTitleId", () => {
  it("names the heading of a currency card after its code", () => {
    expect(buildIncomeTitleId(CURRENCY_CODE.USD)).toBe(
      EXPECTED_DOLLAR_TITLE_ID
    );
  });
});
