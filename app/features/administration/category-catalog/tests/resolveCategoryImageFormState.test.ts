import { describe, expect, it } from "vitest";
import { CATEGORY_IMAGE_FORM_STATE } from "../constants/CategoryImageFormState.constants";
import { resolveCategoryImageFormState } from "../utils/resolveCategoryImageFormState";
import { SAVED_IMAGE_URL } from "./CategoryImageScreen.constants";

describe("resolveCategoryImageFormState", () => {
  it.each([SAVED_IMAGE_URL, null])(
    "is picked whenever a file is chosen (saved image: %s)",
    (imageUrl) => {
      expect(
        resolveCategoryImageFormState({
          hasPickedFile: true,
          imageUrl,
        })
      ).toBe(CATEGORY_IMAGE_FORM_STATE.PICKED);
    }
  );

  it("is saved when no file is chosen and the category has an image", () => {
    expect(
      resolveCategoryImageFormState({
        hasPickedFile: false,
        imageUrl: SAVED_IMAGE_URL,
      })
    ).toBe(CATEGORY_IMAGE_FORM_STATE.SAVED);
  });

  it("is empty when there is neither a file nor an image", () => {
    expect(
      resolveCategoryImageFormState({
        hasPickedFile: false,
        imageUrl: null,
      })
    ).toBe(CATEGORY_IMAGE_FORM_STATE.EMPTY);
  });
});
