import { describe, expect, it } from "vitest";
import { LENGTH } from "@/app/constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import { resolveDirtyLabel } from "../utils/resolveDirtyLabel";

describe("resolveDirtyLabel", () => {
  it("uses the singular copy for one change", () => {
    expect(resolveDirtyLabel(LENGTH.ONE)).toBe(
      CATEGORY_CONFIGURE_SAVE_COPY.DIRTY_SINGULAR
    );
  });

  it.each([LENGTH.ZERO, LENGTH.TWO, LENGTH.THREE])(
    "uses the plural copy for %i changes",
    (changedCount) => {
      expect(resolveDirtyLabel(changedCount)).toBe(
        CATEGORY_CONFIGURE_SAVE_COPY.DIRTY_PLURAL(
          changedCount
        )
      );
    }
  );
});
