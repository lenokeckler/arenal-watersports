import { describe, expect, it } from "vitest";
import { groupAmountsByPaymentMethod } from "../groupAmountsByPaymentMethod";
import {
  ACCENT_DISTINCT_METHODS,
  BLANK_METHODS,
  DRIFTING_CENTS,
  EXPECTED_ACCENTED_CASE_MERGE,
  EXPECTED_ACCENT_DISTINCT_KEYS,
  EXPECTED_BLANK_METHOD,
  EXPECTED_EXACT_CENTS,
  EXPECTED_INNER_SPACES_MERGE,
  EXPECTED_MERGED_METHOD,
  EXPECTED_NORMALIZED_MERGE_COUNT,
  EXPECTED_SORTED_METHODS,
  EXPECTED_THOUSAND_CENTS_TOTAL,
  EXPECTED_TIED_ACCENTED_ORDER,
  INNER_SPACES_OF_ONE_METHOD,
  NORMALIZATION_FORMS_OF_ONE_METHOD,
  SAME_METHOD_DIFFERENT_SPELLING,
  THOUSAND_ONE_CENT_CHARGES,
  TIED_ACCENTED_NAMES,
  UPPER_AND_MIXED_CASE_ACCENTED_METHODS,
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

  it("keeps methods that differ only by an accent as separate methods", () => {
    expect(
      groupAmountsByPaymentMethod(
        ACCENT_DISTINCT_METHODS
      ).map(({ key }) => key)
    ).toEqual(EXPECTED_ACCENT_DISTINCT_KEYS);
  });

  it("merges accented methods typed in upper and mixed case", () => {
    expect(
      groupAmountsByPaymentMethod(
        UPPER_AND_MIXED_CASE_ACCENTED_METHODS
      )
    ).toEqual(EXPECTED_ACCENTED_CASE_MERGE);
  });

  it("merges the composed and decomposed spelling of the same accented method", () => {
    expect(
      groupAmountsByPaymentMethod(
        NORMALIZATION_FORMS_OF_ONE_METHOD
      )
    ).toHaveLength(EXPECTED_NORMALIZED_MERGE_COUNT);
  });

  it("merges a method typed with extra inner spaces", () => {
    expect(
      groupAmountsByPaymentMethod(
        INNER_SPACES_OF_ONE_METHOD
      )
    ).toEqual(EXPECTED_INNER_SPACES_MERGE);
  });

  it("sums a thousand one-cent charges to an exact total", () => {
    expect(
      groupAmountsByPaymentMethod(
        THOUSAND_ONE_CENT_CHARGES
      )[0].amount
    ).toBe(EXPECTED_THOUSAND_CENTS_TOTAL);
  });

  it("breaks an amount tie by Spanish alphabetical name", () => {
    expect(
      groupAmountsByPaymentMethod(TIED_ACCENTED_NAMES).map(
        ({ name }) => name
      )
    ).toEqual(EXPECTED_TIED_ACCENTED_ORDER);
  });
});
