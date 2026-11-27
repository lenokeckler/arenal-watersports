import { describe, expect, it } from "vitest";
import { LENGTH } from "@/app/constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import { resolveFixFieldsLabel } from "../utils/resolveFixFieldsLabel";

describe("resolveFixFieldsLabel", () => {
  it("uses the singular copy for one invalid field", () => {
    expect(resolveFixFieldsLabel(LENGTH.ONE)).toBe(
      CATEGORY_CONFIGURE_SAVE_COPY.FIX_FIELDS_SINGULAR
    );
  });

  it.each([LENGTH.TWO, LENGTH.THREE])(
    "uses the plural copy for %i invalid fields",
    (invalidFieldCount) => {
      expect(resolveFixFieldsLabel(invalidFieldCount)).toBe(
        CATEGORY_CONFIGURE_SAVE_COPY.FIX_FIELDS_PLURAL(
          invalidFieldCount
        )
      );
    }
  );
});
