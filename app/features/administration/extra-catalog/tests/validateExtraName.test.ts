import { describe, expect, it } from "vitest";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { validateExtraName } from "../utils/validateExtraName";
import {
  FAKE_EXTRA_NAME,
  LONG_EXTRA_NAME_REPEATS,
} from "./Extra.constants";

describe("validateExtraName", () => {
  it("accepts a filled name", () => {
    expect(
      validateExtraName(FAKE_EXTRA_NAME)
    ).toBeUndefined();
  });

  it.each(["", "   "])(
    "requires the name when it is %j after trimming",
    (name) => {
      expect(validateExtraName(name)).toBe(
        EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR
      );
    }
  );

  it("accepts a name of any length", () => {
    expect(
      validateExtraName(
        FAKE_EXTRA_NAME.repeat(LONG_EXTRA_NAME_REPEATS)
      )
    ).toBeUndefined();
  });
});
