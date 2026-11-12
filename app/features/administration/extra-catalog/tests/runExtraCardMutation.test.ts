import { showToastMock } from "./extraCardActions.harness";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { RunExtraCardMutationOptions } from "../models/RunExtraCardMutationOptions.interface";
import { clearExtraIdWhenCurrent } from "../utils/clearExtraIdWhenCurrent";
import { runExtraCardMutation } from "../utils/runExtraCardMutation";
import { FAKE_EXTRA_ID } from "./Extra.constants";

const SUCCESS_MESSAGE = "fake success message";
const ERROR_MESSAGE = "fake error message";
const GENERIC_MESSAGE = "fake generic message";
const OTHER_EXTRA_ID = "other-extra-id";

describe("runExtraCardMutation", () => {
  const onSettled = vi.fn();
  const setPendingExtraId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const run = (
    mutate: RunExtraCardMutationOptions["mutate"]
  ) =>
    runExtraCardMutation({
      extraId: FAKE_EXTRA_ID,
      genericErrorMessage: GENERIC_MESSAGE,
      mutate,
      onSettled,
      setPendingExtraId,
      showToast: showToastMock,
    });

  it("toasts the success message and settles", async () => {
    await run(() =>
      Promise.resolve({
        message: SUCCESS_MESSAGE,
        status: EXTRA_MUTATION_STATUS.SUCCESS,
      })
    );

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      SUCCESS_MESSAGE
    );
    expect(onSettled).toHaveBeenCalledOnce();
  });

  it("toasts the error message and settles on a failed result", async () => {
    await run(() =>
      Promise.resolve({
        message: ERROR_MESSAGE,
        status: EXTRA_MUTATION_STATUS.ERROR,
      })
    );

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      ERROR_MESSAGE
    );
    expect(onSettled).toHaveBeenCalledOnce();
  });

  it("toasts the given generic error and settles when the mutation throws", async () => {
    await run(() =>
      Promise.reject(new Error(ERROR_MESSAGE))
    );

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      GENERIC_MESSAGE
    );
    expect(onSettled).toHaveBeenCalledOnce();
  });

  it("adds the extra to the pending ones, then removes only that one", async () => {
    await run(() =>
      Promise.resolve({
        message: SUCCESS_MESSAGE,
        status: EXTRA_MUTATION_STATUS.SUCCESS,
      })
    );

    const [markPending] = setPendingExtraId.mock.calls[0];
    const [clear] = setPendingExtraId.mock.calls[1];
    expect(markPending([OTHER_EXTRA_ID])).toEqual([
      OTHER_EXTRA_ID,
      FAKE_EXTRA_ID,
    ]);
    expect(markPending([FAKE_EXTRA_ID])).toEqual([
      FAKE_EXTRA_ID,
    ]);
    expect(clear([FAKE_EXTRA_ID, OTHER_EXTRA_ID])).toEqual([
      OTHER_EXTRA_ID,
    ]);
  });
});

describe("clearExtraIdWhenCurrent", () => {
  it("clears the id it was built for and keeps any other", () => {
    const clear = clearExtraIdWhenCurrent(FAKE_EXTRA_ID);

    expect(clear(FAKE_EXTRA_ID)).toBeNull();
    expect(clear(OTHER_EXTRA_ID)).toBe(OTHER_EXTRA_ID);
  });
});
