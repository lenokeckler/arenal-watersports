import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { formatCategoryDurationLabel } from "../utils/formatCategoryDurationLabel";
import { FAKE_CONFIGURATION_DURATION_MINUTES } from "./CategoryConfiguration.constants";

describe("formatCategoryDurationLabel", () => {
  it("puts the minutes before the duration unit", () => {
    const label = formatCategoryDurationLabel(
      FAKE_CONFIGURATION_DURATION_MINUTES
    );

    expect(label).toContain(
      FAKE_CONFIGURATION_DURATION_MINUTES.toString()
    );
    expect(
      label.endsWith(CATEGORY_CONFIGURE_COPY.DURATION_UNIT)
    ).toBe(true);
  });
});
