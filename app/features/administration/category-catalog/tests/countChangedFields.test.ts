import { describe, expect, it } from "vitest";
import { LENGTH } from "@/app/constants";
import { countChangedFields } from "../utils/countChangedFields";
import {
  BASELINE_DRAFT,
  buildDraft,
  CHANGED_VALUES_CASES,
  ONE_FLAG_EDITED_VALUES,
} from "./CategoryConfigureSave.constants";
import { buildImageFile } from "./CategoryImage.constants";

const PICKED_FILE = buildImageFile();

describe("countChangedFields", () => {
  it.each(CHANGED_VALUES_CASES)(
    "counts the values of $description",
    ({ values, expected }) => {
      expect(
        countChangedFields({
          baseline: BASELINE_DRAFT,
          current: buildDraft({ values }),
        })
      ).toBe(expected);
    }
  );

  it("counts a pending photo once", () => {
    expect(
      countChangedFields({
        baseline: BASELINE_DRAFT,
        current: buildDraft({ pickedFile: PICKED_FILE }),
      })
    ).toBe(LENGTH.ONE);
  });

  it("counts the active switch once", () => {
    expect(
      countChangedFields({
        baseline: BASELINE_DRAFT,
        current: buildDraft({ isActive: false }),
      })
    ).toBe(LENGTH.ONE);
  });

  it("adds the photo and the switch to the changed values", () => {
    expect(
      countChangedFields({
        baseline: BASELINE_DRAFT,
        current: buildDraft({
          values: ONE_FLAG_EDITED_VALUES,
          pickedFile: PICKED_FILE,
          isActive: false,
        }),
      })
    ).toBe(LENGTH.THREE);
  });

  it("does not count a photo that is already in the baseline", () => {
    const draftWithPhoto = buildDraft({
      pickedFile: PICKED_FILE,
    });

    expect(
      countChangedFields({
        baseline: draftWithPhoto,
        current: draftWithPhoto,
      })
    ).toBe(LENGTH.ZERO);
  });
});
