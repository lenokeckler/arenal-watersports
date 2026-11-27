import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STRING } from "@/app/constants";
import { resolveDepositAction } from "../actions/resolveDepositAction";
import { DEPOSIT_RESOLUTION_FEEDBACK_COPY as FEEDBACK } from "../constants/DepositResolutionFeedbackCopy.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as VALIDATION } from "../constants/DepositResolutionValidationCopy.constants";
import { useDepositResolutionViewModel } from "../hooks/useDepositResolutionViewModel";
import type { DepositResolutionActionResult } from "../models/DepositResolutionActionResult.type";
import {
  CLOSED_DEPOSIT,
  DAMAGE_REASON,
  RESOLUTION_DEPOSIT_ID,
} from "./DepositResolution.constants";
import {
  PARTIAL_INPUT,
  PARTIAL_RECORDED,
  RESOLUTION_NETWORK_FAILURE,
} from "./DepositResolutionAction.constants";

vi.mock("../actions/resolveDepositAction", () => ({
  resolveDepositAction: vi.fn(),
}));

const renderViewModel = () =>
  renderHook(() =>
    useDepositResolutionViewModel(CLOSED_DEPOSIT)
  );

const choosePart = (
  result: ReturnType<typeof renderViewModel>["result"],
  returned: string,
  reason: string = STRING.Empty
): void => {
  act(() => result.current.setReturnsAll(false));
  act(() => result.current.setReturnedText(returned));
  act(() => result.current.setReasonText(reason));
};

describe("useDepositResolutionViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts on returning everything, keeping nothing", () => {
    const { result } = renderViewModel();

    expect(result.current).toMatchObject({
      errors: {},
      formError: STRING.Empty,
      isSubmitDisabled: false,
      keptAmount: 0,
      returnsAll: true,
    });
  });

  it("follows what the company keeps as the amount changes", () => {
    const { result } = renderViewModel();

    choosePart(result, "120");

    expect(result.current.keptAmount).toBe(80);
  });

  it("sends the whole deposit when everything goes back", async () => {
    vi.mocked(resolveDepositAction).mockResolvedValue({
      ok: true,
      recorded: PARTIAL_RECORDED,
    });
    const { result } = renderViewModel();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(resolveDepositAction).toHaveBeenCalledWith({
      depositId: RESOLUTION_DEPOSIT_ID,
      reasonText: STRING.Empty,
      returnedText: "200",
    });
    expect(result.current.recorded).toEqual(
      PARTIAL_RECORDED
    );
    expect(result.current.isSubmitDisabled).toBe(true);
  });

  it("asks for the reason before sending a partial return", async () => {
    const { result } = renderViewModel();
    choosePart(result, "100");

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.errors).toEqual({
      reason: VALIDATION.REASON_REQUIRED,
    });
    expect(resolveDepositAction).not.toHaveBeenCalled();

    act(() => result.current.setReasonText(DAMAGE_REASON));
    expect(result.current.errors).toEqual({});
  });

  it("sends the typed amount and reason", async () => {
    vi.mocked(resolveDepositAction).mockResolvedValue({
      ok: true,
      recorded: PARTIAL_RECORDED,
    });
    const { result } = renderViewModel();
    choosePart(result, "100", DAMAGE_REASON);

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(resolveDepositAction).toHaveBeenCalledWith(
      PARTIAL_INPUT
    );
  });

  it("ignores edits while sending", async () => {
    let answer: (
      value: DepositResolutionActionResult
    ) => void = () => undefined;
    vi.mocked(resolveDepositAction).mockReturnValue(
      new Promise((resolve) => {
        answer = resolve;
      })
    );
    const { result } = renderViewModel();

    act(() => result.current.handleSubmit());
    act(() => result.current.setReturnsAll(false));

    expect(result.current.isPending).toBe(true);
    expect(result.current.returnsAll).toBe(true);
    await act(() =>
      Promise.resolve(
        answer({ ok: true, recorded: PARTIAL_RECORDED })
      )
    );
  });

  it("locks after an unconfirmed failure", async () => {
    vi.mocked(resolveDepositAction).mockRejectedValue(
      RESOLUTION_NETWORK_FAILURE
    );
    const { result } = renderViewModel();
    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.formError).toBe(
      FEEDBACK.UNCONFIRMED
    );
    expect(result.current.isSubmitDisabled).toBe(true);
    expect(resolveDepositAction).toHaveBeenCalledTimes(1);
  });

  it("shows a refusal of the server", async () => {
    vi.mocked(resolveDepositAction).mockResolvedValue({
      ok: false,
      errors: {},
      formError: FEEDBACK.ALREADY_RESOLVED,
    });
    const { result } = renderViewModel();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.formError).toBe(
      FEEDBACK.ALREADY_RESOLVED
    );
    expect(result.current.recorded).toBeNull();
  });
});
