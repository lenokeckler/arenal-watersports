import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SAVE_INPUT } from "./personalEmailForm.constants";
import { createPersonalEmailFormData } from "./createPersonalEmailFormData";
import { usePersonalEmailAction } from "../hooks/usePersonalEmailAction";
import { CURRENT_PASSWORD_INVALID_ERROR } from "./personalEmailHooks.constants";

const serverAction = vi.fn();

const renderAction = () =>
  renderHook(() => usePersonalEmailAction(serverAction));

describe("usePersonalEmailAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    serverAction.mockResolvedValue(
      CURRENT_PASSWORD_INVALID_ERROR
    );
  });

  it("starts with no error and nothing pending", () => {
    const { result } = renderAction();

    expect(result.current.error).toBeNull();
    expect(result.current.isPending).toBe(false);
  });

  it("hands the posted form to the server action and exposes its error", async () => {
    const { result } = renderAction();

    await act(() =>
      Promise.resolve(
        result.current.action(
          createPersonalEmailFormData(SAVE_INPUT)
        )
      )
    );

    expect(serverAction).toHaveBeenCalledOnce();
    expect(result.current.error).toBe(
      CURRENT_PASSWORD_INVALID_ERROR
    );
  });

  it("hides the error once it is dismissed", async () => {
    const { result } = renderAction();
    await act(() =>
      Promise.resolve(
        result.current.action(
          createPersonalEmailFormData(SAVE_INPUT)
        )
      )
    );

    act(() => result.current.dismiss());

    expect(result.current.error).toBeNull();
  });
});
