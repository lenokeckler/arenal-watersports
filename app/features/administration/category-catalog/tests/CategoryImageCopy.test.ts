import { describe, expect, it } from "vitest";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";

const INFORMAL_FORMS =
  /\b(tienes|tu|tus|elige|ingresa|intenta|revisa|tenés)\b/i;

describe("CATEGORY_IMAGE_COPY", () => {
  it.each(Object.entries(CATEGORY_IMAGE_COPY))(
    "addresses the worker as usted in %s",
    (_key, message) => {
      expect(message).not.toMatch(INFORMAL_FORMS);
    }
  );
});
