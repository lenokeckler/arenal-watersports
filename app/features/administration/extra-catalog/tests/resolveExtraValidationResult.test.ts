import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { resolveExtraValidationResult } from "../utils/resolveExtraValidationResult";
import { VALID_EXTRA_FORM_VALUES } from "./ExtraForm.constants";

describe("resolveExtraValidationResult", () => {
  it("returns null for a valid input", () => {
    expect(
      resolveExtraValidationResult(VALID_EXTRA_FORM_VALUES)
    ).toBeNull();
  });

  it("returns only the name error when the prices are valid", () => {
    expect(
      resolveExtraValidationResult({
        ...VALID_EXTRA_FORM_VALUES,
        name: STRING.Empty,
      })
    ).toStrictEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError: EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR,
      priceErrors: undefined,
    });
  });

  it("returns only the price errors when the name is valid", () => {
    expect(
      resolveExtraValidationResult({
        ...VALID_EXTRA_FORM_VALUES,
        priceUsd: STRING.Empty,
      })
    ).toStrictEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError: undefined,
      priceErrors: {
        prices: EXTRA_CATALOG_COPY.PRICES_REQUIRED_ERROR,
      },
    });
  });
});
