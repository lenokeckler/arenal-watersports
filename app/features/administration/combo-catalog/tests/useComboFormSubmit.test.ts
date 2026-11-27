import {
  pushMock,
  refreshMock,
  renderComboSubmit,
  rethrowMock,
  saveComboMock,
  showToastMock,
  submitComboForm,
} from "./comboForm.harness";
import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, STATUS } from "@/app/constants";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import type { SaveComboResult } from "../models/SaveComboResult.interface";
import { mapComboFormValuesToPayload } from "../utils/mapComboFormValuesToPayload";
import { FAKE_COMBO_ID } from "./Combo.constants";
import {
  buildComboFormValues,
  INITIAL_INVALID_VALUES,
  SAVE_FAILURE_RESULT,
  SAVE_FAILURE_WITHOUT_MESSAGE_RESULT,
  SAVE_SUCCESS_RESULT,
  SERVER_ERROR_MESSAGE,
  SUBMISSIONS_WHILE_LOCKED,
  VALID_COMBO_FORM_VALUES,
} from "./ComboForm.constants";
import { createDeferred } from "./createDeferred";
import { settleDeferred } from "./settleDeferred";

const VALID_OPTIONS = { values: VALID_COMBO_FORM_VALUES };

describe("useComboFormSubmit", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    saveComboMock.mockResolvedValue(SAVE_SUCCESS_RESULT);
  });

  it("sends the mapped payload of a new combo, toasts, goes to the list and refreshes", async () => {
    const { result } = renderComboSubmit(VALID_OPTIONS);

    await submitComboForm(result);

    expect(saveComboMock).toHaveBeenCalledWith(
      mapComboFormValuesToPayload(VALID_COMBO_FORM_VALUES)
    );
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      COMBO_FORM_COPY.SAVE_SUCCESS_TOAST
    );
    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.COMBOS
    );
    expect(refreshMock).toHaveBeenCalledOnce();
  });

  it("sends the combo id when an existing combo is saved", async () => {
    const { result } = renderComboSubmit({
      ...VALID_OPTIONS,
      comboId: FAKE_COMBO_ID,
    });

    await submitComboForm(result);

    expect(saveComboMock).toHaveBeenCalledWith(
      mapComboFormValuesToPayload(
        VALID_COMBO_FORM_VALUES,
        FAKE_COMBO_ID
      )
    );
  });

  it("calls no action and shows the errors when the values are invalid", async () => {
    const { result } = renderComboSubmit({
      values: buildComboFormValues(INITIAL_INVALID_VALUES),
    });
    expect(result.current.errors.count).toBe(0);

    await submitComboForm(result);

    expect(result.current.errors.name).toBe(
      COMBO_FORM_COPY.NAME_REQUIRED_ERROR
    );
    expect(saveComboMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it.each([
    {
      description: "the message of the action",
      result: SAVE_FAILURE_RESULT,
      expected: SERVER_ERROR_MESSAGE,
    },
    {
      description: "the generic message when it has none",
      result: SAVE_FAILURE_WITHOUT_MESSAGE_RESULT,
      expected: COMBO_FORM_COPY.SAVE_GENERIC_ERROR,
    },
  ])(
    "keeps the form and shows $description in the banner",
    async ({ result: saveResult, expected }) => {
      saveComboMock.mockResolvedValue(saveResult);
      const { result } = renderComboSubmit(VALID_OPTIONS);

      await submitComboForm(result);

      expect(result.current.submitError).toBe(expected);
      expect(showToastMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
      expect(refreshMock).not.toHaveBeenCalled();
      expect(result.current.isSubmitting).toBe(false);
    }
  );

  it("shows the generic message and releases the form when the action throws", async () => {
    const failure = new Error(SERVER_ERROR_MESSAGE);
    saveComboMock.mockRejectedValue(failure);
    const { result } = renderComboSubmit(VALID_OPTIONS);

    await submitComboForm(result);

    expect(rethrowMock).toHaveBeenCalledWith(failure);
    expect(result.current.submitError).toBe(
      COMBO_FORM_COPY.SAVE_GENERIC_ERROR
    );
    expect(pushMock).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("blocks a second submission while the first is in flight", async () => {
    const deferred = createDeferred<SaveComboResult>();
    saveComboMock.mockReturnValue(deferred.promise);
    const { result } = renderComboSubmit(VALID_OPTIONS);

    act(() => {
      void result.current.onSubmit(buildFormSubmitEvent());
      void result.current.onSubmit(buildFormSubmitEvent());
    });

    expect(result.current.isSubmitting).toBe(true);
    expect(saveComboMock).toHaveBeenCalledTimes(
      SUBMISSIONS_WHILE_LOCKED
    );
    await settleDeferred(deferred, SAVE_SUCCESS_RESULT);
    expect(result.current.isSubmitting).toBe(false);
  });
});
