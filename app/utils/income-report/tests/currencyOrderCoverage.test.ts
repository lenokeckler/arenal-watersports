import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  CURRENCY_ORDER,
} from "@/app/constants";

describe("CURRENCY_ORDER", () => {
  it("lists every currency code exactly once", () => {
    expect([...CURRENCY_ORDER].sort()).toEqual(
      Object.values(CURRENCY_CODE).sort()
    );
  });
});
