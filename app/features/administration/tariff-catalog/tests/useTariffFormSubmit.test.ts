import {
  pushMock,
  refreshMock,
  renderTariffSubmit,
  rethrowMock,
  saveTariffsMock,
  showToastMock,
  submitTariffForm,
} from "./tariffForm.harness";
import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CURRENCY_CODE,
  PATHS,
  STATUS,
} from "@/app/constants";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import { TARIFF_FORM_COPY } from "../constants/TariffFormCopy.constants";
import { TARIFF_PRICE_ERROR_COPY } from "../constants/TariffPriceErrorCopy.constants";
import type { SaveTariffsResult } from "../models/SaveTariffsResult.interface";
import { TARIFF_TYPE } from "../constants/TariffType.constants";
import {
  buildFormValues,
  buildTypeValues,
  EXISTING_TARIFFS,
  EXPECTED_SAVE_PAYLOAD,
  FILLED_FORM_VALUES,
  NON_NUMERIC_PRICE_TEXT,
  SAVE_FAILURE_RESULT,
  SAVE_FAILURE_WITHOUT_MESSAGE_RESULT,
  SAVE_SUCCESS_RESULT,
  SERVER_ERROR_MESSAGE,
  SUBMISSIONS_WHILE_LOCKED,
} from "./TariffForm.constants";
import { createDeferred } from "./createDeferred";
import { settleDeferred } from "./settleDeferred";

const VALID_OPTIONS = {
  tariff: EXISTING_TARIFFS,
  values: FILLED_FORM_VALUES,
};

describe("useTariffFormSubmit", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    saveTariffsMock.mockResolvedValue(SAVE_SUCCESS_RESULT);
  });

  it("sends the mapped payload, toasts, goes to the list and refreshes", async () => {
    const { result } = renderTariffSubmit(VALID_OPTIONS);

    await submitTariffForm(result);

    expect(saveTariffsMock).toHaveBeenCalledWith(
      EXPECTED_SAVE_PAYLOAD
    );
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      TARIFF_FORM_COPY.SAVE_SUCCESS_TOAST
    );
    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.TARIFFS
    );
    expect(refreshMock).toHaveBeenCalledOnce();
  });

  it("shows the errors only after submitting and calls no action when invalid", async () => {
    const { result } = renderTariffSubmit({
      ...VALID_OPTIONS,
      values: buildFormValues({
        ...FILLED_FORM_VALUES,
        [TARIFF_TYPE.RENTAL]: buildTypeValues({
          usdText: NON_NUMERIC_PRICE_TEXT,
        }),
      }),
    });
    expect(result.current.errors.count).toBe(0);

    await submitTariffForm(result);

    expect(result.current.errors.rental.usd).toBe(
      TARIFF_PRICE_ERROR_COPY[CURRENCY_CODE.USD].format
    );
    expect(saveTariffsMock).not.toHaveBeenCalled();
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
      expected: TARIFF_FORM_COPY.SAVE_GENERIC_ERROR,
    },
  ])(
    "keeps the form and exposes $description",
    async ({ result: saveResult, expected }) => {
      saveTariffsMock.mockResolvedValue(saveResult);
      const { result } = renderTariffSubmit(VALID_OPTIONS);

      await submitTariffForm(result);

      expect(result.current.submitError).toBe(expected);
      expect(showToastMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
      expect(result.current.isSubmitting).toBe(false);
    }
  );

  it("shows the generic message and releases the form when the action throws", async () => {
    const failure = new Error(SERVER_ERROR_MESSAGE);
    saveTariffsMock.mockRejectedValue(failure);
    const { result } = renderTariffSubmit(VALID_OPTIONS);

    await submitTariffForm(result);

    expect(rethrowMock).toHaveBeenCalledWith(failure);
    expect(result.current.submitError).toBe(
      TARIFF_FORM_COPY.SAVE_GENERIC_ERROR
    );
    expect(result.current.isSubmitting).toBe(false);
  });

  it("blocks a second submission while the first is in flight", async () => {
    const deferred = createDeferred<SaveTariffsResult>();
    saveTariffsMock.mockReturnValue(deferred.promise);
    const { result } = renderTariffSubmit(VALID_OPTIONS);

    act(() => {
      void result.current.onSubmit(buildFormSubmitEvent());
      void result.current.onSubmit(buildFormSubmitEvent());
    });

    expect(result.current.isSubmitting).toBe(true);
    expect(saveTariffsMock).toHaveBeenCalledTimes(
      SUBMISSIONS_WHILE_LOCKED
    );
    await settleDeferred(deferred, SAVE_SUCCESS_RESULT);
    expect(result.current.isSubmitting).toBe(false);
  });
});
