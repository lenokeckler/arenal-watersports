import { describe, expect, it } from "vitest";
import { countChangedValues } from "../utils/countChangedValues";
import {
  BASELINE_EDITED_VALUES,
  CHANGED_VALUES_CASES,
} from "./CategoryConfigureSave.constants";

describe("countChangedValues", () => {
  it.each(CHANGED_VALUES_CASES)(
    "counts $expected for $description",
    ({ values, expected }) => {
      expect(
        countChangedValues(BASELINE_EDITED_VALUES, values)
      ).toBe(expected);
    }
  );
});
