import { describe, expect, it } from "vitest";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { validateExtraInput } from "../utils/validateExtraInput";
import { VALID_EXTRA_FORM_VALUES } from "./ExtraForm.constants";

describe("validateExtraInput", () => {
  it("reports the name and the prices together", () => {
    expect(validateExtraInput(undefined)).toStrictEqual({
      name: EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR,
      prices: EXTRA_CATALOG_COPY.PRICES_REQUIRED_ERROR,
    });
  });

  it("reports nothing for a valid input", () => {
    expect(
      validateExtraInput(VALID_EXTRA_FORM_VALUES)
    ).toStrictEqual({});
  });
});
