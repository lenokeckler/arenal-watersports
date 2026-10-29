import { act, renderHook } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { useRouter } from "next/navigation";
import { signOutThisDevice } from "@/app/services/authentication/signOutThisDevice";
import { LOGOUT_CONFIRM_RESET_MS } from "../constants/LogoutConfirm.constants";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import { useLogoutViewModel } from "../hooks/useLogoutViewModel";
import { deferSignOutResult } from "./deferSignOutResult";
import {
  pressOnce,
  settle,
} from "./useLogoutViewModel.actions";
import {
  ONE_MILLISECOND,
  SIGN_OUT_OK,
  TIMER_COUNT,
} from "./useLogoutViewModel.constants";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock(
  "@/app/services/authentication/signOutThisDevice",
  () => ({ signOutThisDevice: vi.fn() })
);

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: vi.fn(),
}));

describe("useLogoutViewModel confirmation", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
    vi.mocked(useRouter).mockReturnValue({
      replace: vi.fn(),
    } as unknown as ReturnType<typeof useRouter>);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts idle with no error and no announcement", () => {
    const { result } = renderHook(useLogoutViewModel);

    expect(result.current.phase).toBe(LOGOUT_PHASE.IDLE);
    expect(result.current.errorMessage).toBeNull();
    expect(result.current.pendingAnnouncement).toBe("");
  });

  it("asks for confirmation on the first press without signing out", async () => {
    const { result } = renderHook(useLogoutViewModel);

    await pressOnce(result);

    expect(result.current.phase).toBe(
      LOGOUT_PHASE.CONFIRMING
    );
    expect(signOutThisDevice).not.toHaveBeenCalled();
  });

  it("stays confirming until the reset time has elapsed", async () => {
    const { result } = renderHook(useLogoutViewModel);
    await pressOnce(result);

    act(() => {
      vi.advanceTimersByTime(
        LOGOUT_CONFIRM_RESET_MS - ONE_MILLISECOND
      );
    });

    expect(result.current.phase).toBe(
      LOGOUT_PHASE.CONFIRMING
    );
  });

  it("returns to idle when no second press arrives in time", async () => {
    const { result } = renderHook(useLogoutViewModel);
    await pressOnce(result);

    act(() => {
      vi.advanceTimersByTime(LOGOUT_CONFIRM_RESET_MS);
    });

    expect(result.current.phase).toBe(LOGOUT_PHASE.IDLE);
    expect(signOutThisDevice).not.toHaveBeenCalled();
  });

  it("clears the reset timer when unmounted while confirming", async () => {
    const { result, unmount } = renderHook(
      useLogoutViewModel
    );
    await pressOnce(result);
    expect(vi.getTimerCount()).toBe(TIMER_COUNT.ONE);

    unmount();

    expect(vi.getTimerCount()).toBe(TIMER_COUNT.NONE);
  });

  it("clears the reset timer on the second press", async () => {
    const pendingSignOut = deferSignOutResult();
    vi.mocked(signOutThisDevice).mockReturnValue(
      pendingSignOut.promise
    );
    const { result } = renderHook(useLogoutViewModel);
    await pressOnce(result);

    await pressOnce(result);

    expect(vi.getTimerCount()).toBe(TIMER_COUNT.NONE);
    await settle(() => pendingSignOut.resolve(SIGN_OUT_OK));
  });

  it("stays pending past the reset time once the second press happened", async () => {
    const pendingSignOut = deferSignOutResult();
    vi.mocked(signOutThisDevice).mockReturnValue(
      pendingSignOut.promise
    );
    const { result } = renderHook(useLogoutViewModel);
    await pressOnce(result);
    await pressOnce(result);

    act(() => {
      vi.advanceTimersByTime(LOGOUT_CONFIRM_RESET_MS);
    });

    expect(result.current.phase).toBe(LOGOUT_PHASE.PENDING);
    await settle(() => pendingSignOut.resolve(SIGN_OUT_OK));
  });
});
