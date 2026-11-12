import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { useRouter } from "next/navigation";
import { attemptSignOutThisDevice } from "@/app/services/authentication/attemptSignOutThisDevice";
import { buildLoginSignedOutPath } from "@/app/utils/pathname/buildLoginSignedOutPath";
import { SESSION_IDLE_SIGN_OUT_PHASE } from "../constants/SessionIdleSignOutPhase.constants";
import { useSessionIdleSignOut } from "../hooks/useSessionIdleSignOut";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock(
  "@/app/services/authentication/attemptSignOutThisDevice",
  () => ({ attemptSignOutThisDevice: vi.fn() })
);

const replace = vi.fn();

describe("useSessionIdleSignOut", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      replace,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it("starts idle", () => {
    const { result } = renderHook(useSessionIdleSignOut);

    expect(result.current.phase).toBe(
      SESSION_IDLE_SIGN_OUT_PHASE.IDLE
    );
  });

  it("goes to the login with the signed-out notice once signed out", async () => {
    vi.mocked(attemptSignOutThisDevice).mockResolvedValue(
      true
    );
    const { result } = renderHook(useSessionIdleSignOut);

    await act(() => result.current.signOut());

    expect(replace).toHaveBeenCalledWith(
      buildLoginSignedOutPath()
    );
  });

  it("stays and reports the failure when signing out fails", async () => {
    vi.mocked(attemptSignOutThisDevice).mockResolvedValue(
      false
    );
    const { result } = renderHook(useSessionIdleSignOut);

    await act(() => result.current.signOut());

    expect(replace).not.toHaveBeenCalled();
    expect(result.current.phase).toBe(
      SESSION_IDLE_SIGN_OUT_PHASE.FAILED
    );
  });

  it("signs out only once while the first attempt runs", async () => {
    vi.mocked(attemptSignOutThisDevice).mockResolvedValue(
      true
    );
    const { result } = renderHook(useSessionIdleSignOut);

    await act(() =>
      Promise.all([
        result.current.signOut(),
        result.current.signOut(),
      ])
    );

    expect(attemptSignOutThisDevice).toHaveBeenCalledOnce();
  });
});
