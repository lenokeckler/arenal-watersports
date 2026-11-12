import { describe, expect, it } from "vitest";
import {
  AUTOCAPITALIZE,
  INPUT_MODE,
  INPUT_TYPES,
} from "@/app/constants";
import {
  AUTOCAPITALIZE_ATTRIBUTE,
  INPUT_MODE_ATTRIBUTE,
  SPELLCHECK_ATTRIBUTE,
  SPELLCHECK_OFF,
} from "./FieldFactory.constants";
import { renderFieldFactory } from "./renderFieldFactory";

describe("FieldFactory input attributes", () => {
  it.each([INPUT_TYPES.EMAIL, INPUT_TYPES.PASSWORD])(
    "forwards inputMode, autoCapitalize and spellCheck to the %s input",
    (type) => {
      const page = renderFieldFactory({
        autoCapitalize: AUTOCAPITALIZE.NONE,
        inputMode: INPUT_MODE.EMAIL,
        spellCheck: false,
        type,
      });

      expect(page.getInput()).toHaveAttribute(
        INPUT_MODE_ATTRIBUTE,
        INPUT_MODE.EMAIL
      );
      expect(page.getInput()).toHaveAttribute(
        AUTOCAPITALIZE_ATTRIBUTE,
        AUTOCAPITALIZE.NONE
      );
      expect(page.getInput()).toHaveAttribute(
        SPELLCHECK_ATTRIBUTE,
        SPELLCHECK_OFF
      );
    }
  );

  it.each([INPUT_TYPES.TEXT, INPUT_TYPES.PASSWORD])(
    "leaves the %s input without the attributes by default",
    (type) => {
      const page = renderFieldFactory({ type });

      expect(page.getInput()).not.toHaveAttribute(
        INPUT_MODE_ATTRIBUTE
      );
      expect(page.getInput()).not.toHaveAttribute(
        AUTOCAPITALIZE_ATTRIBUTE
      );
      expect(page.getInput()).not.toHaveAttribute(
        SPELLCHECK_ATTRIBUTE
      );
    }
  );
});
