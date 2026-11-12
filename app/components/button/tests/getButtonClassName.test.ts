import { describe, expect, it } from "vitest";
import { BUTTON } from "../constants";
import {
  BUTTON_ENABLED_CLASS,
  BUTTON_PRIMARY_CLASS,
  BUTTON_TOUCH_TARGET_CLASS,
} from "../styles/Button.styles";
import { getButtonClassName } from "../utils/getButtonClassName";
import {
  ACTION_VARIANT_CASES,
  BUTTON_CALLER_CLASS,
  BUTTON_TEST_CHILDREN,
  STANDARD_VARIANT_CASES,
} from "./getButtonClassName.constants";

describe("getButtonClassName", () => {
  it("adds touch-target and caller classes for base buttons", () => {
    const className = getButtonClassName({
      children: BUTTON_TEST_CHILDREN,
      className: BUTTON_CALLER_CLASS,
      variant: BUTTON.BASE,
    });

    expect(className).toContain(BUTTON_TOUCH_TARGET_CLASS);
    expect(className).toContain(BUTTON_CALLER_CLASS);
    expect(className).toContain(BUTTON_ENABLED_CLASS);
    expect(className).not.toContain(BUTTON_PRIMARY_CLASS);
  });

  it.each(ACTION_VARIANT_CASES)(
    "applies the %s action classes",
    (variant, expectedClassName) => {
      expect(
        getButtonClassName({
          children: BUTTON_TEST_CHILDREN,
          variant,
        })
      ).toContain(expectedClassName);
    }
  );

  it.each(STANDARD_VARIANT_CASES)(
    "applies configured classes for standard variant %s",
    (variant, expectedClassName) => {
      expect(
        getButtonClassName({
          children: BUTTON_TEST_CHILDREN,
          variant,
        })
      ).toContain(expectedClassName);
    }
  );
});
