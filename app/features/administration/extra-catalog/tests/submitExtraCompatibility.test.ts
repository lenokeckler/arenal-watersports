import {
  rethrowMock,
  setCompatibilityMock,
  showToastMock,
} from "./extraCompatibilityUnits.harness";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { SetExtraCompatibilityInput } from "../models/SetExtraCompatibilityInput.interface";
import { submitExtraCompatibility } from "../utils/submitExtraCompatibility";
import {
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_EXTRA_ID,
  LINKED_UNIT_ID,
} from "./ExtraCompatibility.constants";

const INPUT: SetExtraCompatibilityInput = {
  extraId: COMPATIBILITY_EXTRA_ID,
  categoryId: COMPATIBILITY_CATEGORY_ID,
  unitIds: [LINKED_UNIT_ID],
};

const NETWORK_ERROR_MESSAGE = "Failed to fetch";

describe("submitExtraCompatibility", () => {
  const onSaved = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    setCompatibilityMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  afterEach(() => vi.restoreAllMocks());

  it("saves the selection, toasts the success and reports it saved", async () => {
    await submitExtraCompatibility({
      input: INPUT,
      onSaved,
      showToast: showToastMock,
    });

    expect(setCompatibilityMock).toHaveBeenCalledWith(
      INPUT
    );
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      EXTRA_COMPATIBILITY_COPY.SAVE_SUCCESS_TOAST
    );
    expect(onSaved).toHaveBeenCalledOnce();
  });

  it("shows the message of a failed result and does not report it saved", async () => {
    setCompatibilityMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.ERROR,
      message: EXTRA_COMPATIBILITY_COPY.NOT_FOUND_ERROR,
    });

    await submitExtraCompatibility({
      input: INPUT,
      onSaved,
      showToast: showToastMock,
    });

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      EXTRA_COMPATIBILITY_COPY.NOT_FOUND_ERROR
    );
    expect(onSaved).not.toHaveBeenCalled();
  });

  it("falls back to the generic save error when a failed result has no message", async () => {
    setCompatibilityMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.ERROR,
    });

    await submitExtraCompatibility({
      input: INPUT,
      onSaved,
      showToast: showToastMock,
    });

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      EXTRA_COMPATIBILITY_COPY.SAVE_ERROR
    );
  });

  it("asks for a connection without calling the action while offline", async () => {
    vi.spyOn(
      window.navigator,
      "onLine",
      "get"
    ).mockReturnValue(false);

    await submitExtraCompatibility({
      input: INPUT,
      onSaved,
      showToast: showToastMock,
    });

    expect(setCompatibilityMock).not.toHaveBeenCalled();
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      EXTRA_COMPATIBILITY_COPY.OFFLINE_ERROR
    );
    expect(onSaved).not.toHaveBeenCalled();
  });

  it("tells the worker the save failed when the request breaks", async () => {
    setCompatibilityMock.mockRejectedValue(
      new Error(NETWORK_ERROR_MESSAGE)
    );

    await submitExtraCompatibility({
      input: INPUT,
      onSaved,
      showToast: showToastMock,
    });

    expect(rethrowMock).toHaveBeenCalledOnce();
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      EXTRA_COMPATIBILITY_COPY.SAVE_ERROR
    );
    expect(onSaved).not.toHaveBeenCalled();
  });
});
