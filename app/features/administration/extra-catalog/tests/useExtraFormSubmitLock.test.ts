import {
  createExtraMock,
  renderExtraSubmit,
  submitExtraFormEvent,
} from "./extraForm.harness";
import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import { createDeferred } from "./createDeferred";
import {
  EXTRA_FORM_SUCCESS_RESULT,
  SUBMISSIONS_AFTER_RELEASE,
  SUBMISSIONS_WHILE_LOCKED,
} from "./ExtraForm.constants";
import { settleDeferred } from "./settleDeferred";

describe("useExtraFormSubmit lock", () => {
  beforeEach(() => vi.resetAllMocks());

  it("blocks a second submission while the first is in flight", async () => {
    const deferred = createDeferred<ExtraMutationResult>();
    createExtraMock.mockReturnValue(deferred.promise);
    const { result } = renderExtraSubmit();

    act(() => {
      void result.current.onSubmit(buildFormSubmitEvent());
      void result.current.onSubmit(buildFormSubmitEvent());
    });

    expect(result.current.isSubmitting).toBe(true);
    expect(createExtraMock).toHaveBeenCalledTimes(
      SUBMISSIONS_WHILE_LOCKED
    );

    await settleDeferred(
      deferred,
      EXTRA_FORM_SUCCESS_RESULT
    );

    expect(result.current.isSubmitting).toBe(false);
  });

  it("accepts a new submission once the first one settled", async () => {
    createExtraMock.mockResolvedValue(
      EXTRA_FORM_SUCCESS_RESULT
    );
    const { result } = renderExtraSubmit();

    await submitExtraFormEvent(result);
    await submitExtraFormEvent(result);

    expect(createExtraMock).toHaveBeenCalledTimes(
      SUBMISSIONS_AFTER_RELEASE
    );
  });
});
