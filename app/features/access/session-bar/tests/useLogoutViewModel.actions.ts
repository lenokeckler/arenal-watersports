import { act } from "@testing-library/react";
import type { LogoutHookResult } from "./LogoutHookResult.type";

export const pressOnce = async (
  result: LogoutHookResult
): Promise<void> => {
  await act(async () => {
    result.current.handlePress();
    await Promise.resolve();
  });
};

export const pressTwiceInOneAct = async (
  result: LogoutHookResult
): Promise<void> => {
  await act(async () => {
    const { handlePress } = result.current;
    handlePress();
    handlePress();
    await Promise.resolve();
  });
};

export const settle = async (
  settlement: () => void
): Promise<void> => {
  await act(async () => {
    settlement();
    await Promise.resolve();
  });
};
