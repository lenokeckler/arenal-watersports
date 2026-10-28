import { describe, expect, it } from "vitest";
import { groupAmountsByPaymentMethod } from "../groupAmountsByPaymentMethod";
import {
  BLANK_METHODS,
  DRIFTING_CENTS,
  EXPECTED_BLANK_METHOD,
  EXPECTED_EXACT_CENTS,
  EXPECTED_MERGED_METHOD,
  EXPECTED_SORTED_METHODS,
  SAME_METHOD_DIFFERENT_SPELLING,
  UNSORTED_METHODS,
} from "./Income.constants";

describe("groupAmountsByPaymentMethod", () => {
  it("merges a method typed with other casing or spaces under its first-seen name", () => {
    expect(
      groupAmountsByPaymentMethod(
        SAME_METHOD_DIFFERENT_SPELLING
      )
    ).toEqual(EXPECTED_MERGED_METHOD);
  });

  it("sums decimal amounts exactly to the cent", () => {
    expect(
      groupAmountsByPaymentMethod(DRIFTING_CENTS)
    ).toEqual(EXPECTED_EXACT_CENTS);
  });

  it("groups blank methods under an empty key and name", () => {
    expect(
      groupAmountsByPaymentMethod(BLANK_METHODS)
    ).toEqual(EXPECTED_BLANK_METHOD);
  });

  it("orders methods by amount, largest first, then by name", () => {
    expect(
      groupAmountsByPaymentMethod(UNSORTED_METHODS)
    ).toEqual(EXPECTED_SORTED_METHODS);
  });

  it("returns an empty list when there is no charge", () => {
    expect(groupAmountsByPaymentMethod([])).toEqual([]);
  });
});
