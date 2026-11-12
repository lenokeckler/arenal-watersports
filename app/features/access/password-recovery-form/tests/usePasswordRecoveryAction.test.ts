import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { usePasswordRecoveryAction } from "../hooks/usePasswordRecoveryAction";
import { createPasswordRecoveryRequestFormData } from "./createPasswordRecoveryRequestFormData";
import {
  RAW_USERNAME,
  UNKNOWN_ERROR,
} from "./passwordRecoveryRequest.constants";

const serverAction = vi.fn();

const renderAction = () =>
  renderHook(() => usePasswordRecoveryAction(serverAction));

const postForm = (
  result: ReturnType<typeof renderAction>["result"]
) =>
  act(() =>
    Promise.resolve(
      result.current.action(
        createPasswordRecoveryRequestFormData(RAW_USERNAME)
      )
    )
  );

describe("usePasswordRecoveryAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    serverAction.mockResolvedValue(UNKNOWN_ERROR);
  });

  it("starts with no error and nothing pending", () => {
    const { result } = renderAction();

    expect(result.current.error).toBeNull();
    expect(result.current.isPending).toBe(false);
  });

  it("hands the posted form to the server action and exposes its error", async () => {
    const { result } = renderAction();

    await postForm(result);

    expect(serverAction).toHaveBeenCalledOnce();
    expect(result.current.error).toBe(UNKNOWN_ERROR);
  });

  it("hides the error once it is dismissed", async () => {
    const { result } = renderAction();
    await postForm(result);

    act(() => result.current.dismiss());

    expect(result.current.error).toBeNull();
  });
});
