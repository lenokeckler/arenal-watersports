import { describe, expect, it } from "vitest";
import { compareBoardCategories } from "../compareBoardCategories";
import {
  ACCENTED_CATEGORY,
  DOUBLE_KAYAK,
  INDIVIDUAL_KAYAK,
  PLAIN_CATEGORY,
  SAME_NAME_HIGH_ID,
  SAME_NAME_LOW_ID,
} from "./BoardCategories.constants";

describe("compareBoardCategories", () => {
  it("puts the alphabetically first name first", () => {
    expect(
      [INDIVIDUAL_KAYAK, DOUBLE_KAYAK].sort(
        compareBoardCategories
      )
    ).toEqual([DOUBLE_KAYAK, INDIVIDUAL_KAYAK]);
  });

  it("sorts an accented initial with its plain letter", () => {
    expect(
      [PLAIN_CATEGORY, ACCENTED_CATEGORY].sort(
        compareBoardCategories
      )
    ).toEqual([ACCENTED_CATEGORY, PLAIN_CATEGORY]);
  });

  it("breaks a tie on the name by the id", () => {
    expect(
      [SAME_NAME_HIGH_ID, SAME_NAME_LOW_ID].sort(
        compareBoardCategories
      )
    ).toEqual([SAME_NAME_LOW_ID, SAME_NAME_HIGH_ID]);
  });
});
