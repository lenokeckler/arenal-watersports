import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { DEPOSIT_RESOLUTION_FEEDBACK_COPY as FEEDBACK } from "../constants/DepositResolutionFeedbackCopy.constants";
import { DEPOSIT_RESOLUTION_FIELD_ID as FIELD_ID } from "../constants/DepositResolutionUi.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as VALIDATION } from "../constants/DepositResolutionValidationCopy.constants";
import {
  useDepositResolutionErrorFocus,
  useDepositResolutionSuccessFocus,
} from "../hooks/useDepositResolutionFocus";

const mountFocusables = (): void => {
  Object.values(FIELD_ID).forEach((id) => {
    const element = document.createElement("input");
    element.id = id;
    document.body.append(element);
  });
};

describe("deposit resolution focus", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it.each([
    [
      FIELD_ID.RETURNED,
      {
        reason: VALIDATION.REASON_REQUIRED,
        returned: VALIDATION.RETURNED_REQUIRED,
      },
      FEEDBACK.GENERIC,
    ],
    [
      FIELD_ID.REASON,
      { reason: VALIDATION.REASON_REQUIRED },
      FEEDBACK.GENERIC,
    ],
    [FIELD_ID.ALERT, {}, FEEDBACK.GENERIC],
  ])("focuses %s first", (expected, errors, formError) => {
    mountFocusables();

    renderHook(() =>
      useDepositResolutionErrorFocus(errors, formError)
    );

    expect(document.activeElement?.id).toBe(expected);
  });

  it("focuses nothing without a problem and the success on mount", () => {
    mountFocusables();

    renderHook(() =>
      useDepositResolutionErrorFocus({}, STRING.Empty)
    );
    expect(document.activeElement).toBe(document.body);

    renderHook(() => useDepositResolutionSuccessFocus());
    expect(document.activeElement?.id).toBe(
      FIELD_ID.SUCCESS
    );
  });
});
