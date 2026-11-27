import { describe, expect, it } from "vitest";
import { applyCategoryTraitValues } from "../utils/applyCategoryTraitValues";
import { DEFAULT_CATEGORY_CONFIGURATION } from "./CategoryConfiguration.constants";
import { EDITED_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryConfigureValues.constants";

const {
  hasMotor,
  consumesFuel,
  canBeDamaged,
  hasConditionPhotos,
} = EDITED_CATEGORY_BEHAVIOR_FORM_VALUES;

describe("applyCategoryTraitValues", () => {
  it("applies the four edited traits over the saved ones", () => {
    const { behavior } = applyCategoryTraitValues(
      DEFAULT_CATEGORY_CONFIGURATION,
      EDITED_CATEGORY_BEHAVIOR_FORM_VALUES
    );

    expect(behavior).toMatchObject({
      hasMotor,
      consumesFuel,
      canBeDamaged,
      hasConditionPhotos,
    });
  });

  it("does not touch the reservation fields or the rest of the configuration", () => {
    const result = applyCategoryTraitValues(
      DEFAULT_CATEGORY_CONFIGURATION,
      EDITED_CATEGORY_BEHAVIOR_FORM_VALUES
    );

    expect(result.behavior.guideOnly).toBe(
      DEFAULT_CATEGORY_CONFIGURATION.behavior.guideOnly
    );
    expect({ ...result, behavior: null }).toEqual({
      ...DEFAULT_CATEGORY_CONFIGURATION,
      behavior: null,
    });
  });
});
