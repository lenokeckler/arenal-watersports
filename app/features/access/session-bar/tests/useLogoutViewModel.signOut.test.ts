import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { useRouter } from "next/navigation";
import { signOutThisDevice } from "@/app/services/authentication/signOutThisDevice";
import { LOGOUT_COPY } from "../constants/LogoutCopy.constants";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import { useLogoutViewModel } from "../hooks/useLogoutViewModel";
import { deferSignOutResult } from "./deferSignOutResult";
import {
  pressOnce,
  pressTwiceInOneAct,
  settle,
} from "./useLogoutViewModel.actions";
import {
  SIGN_OUT_CALL_COUNT,
  SIGN_OUT_FAILURE,
  SIGN_OUT_OK,
  SIGN_OUT_REFUSED,
  SIGNED_OUT_LOGIN_PATH,
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

const replace = vi.fn();

describe("useLogoutViewModel sign-out", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      replace,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it("enters pending and announces it on the second press", async () => {
    const pendingSignOut = deferSignOutResult();
    vi.mocked(signOutThisDevice).mockReturnValue(
      pendingSignOut.promise
    );
    const { result } = renderHook(useLogoutViewModel);
    await pressOnce(result);

    await pressOnce(result);

    expect(result.current.phase).toBe(LOGOUT_PHASE.PENDING);
    expect(result.current.pendingAnnouncement).toBe(
      LOGOUT_COPY.PENDING
    );
    expect(result.current.errorMessage).toBeNull();
    await settle(() => pendingSignOut.resolve(SIGN_OUT_OK));
  });

  it("signs out exactly once when the confirming press is doubled in one act", async () => {
    const pendingSignOut = deferSignOutResult();
    vi.mocked(signOutThisDevice).mockReturnValue(
      pendingSignOut.promise
    );
    const { result } = renderHook(useLogoutViewModel);
    await pressOnce(result);

    await pressTwiceInOneAct(result);

    expect(signOutThisDevice).toHaveBeenCalledOnce();
    await settle(() => pendingSignOut.resolve(SIGN_OUT_OK));
  });

  it("ignores presses while pending", async () => {
    const pendingSignOut = deferSignOutResult();
    vi.mocked(signOutThisDevice).mockReturnValue(
      pendingSignOut.promise
    );
    const { result } = renderHook(useLogoutViewModel);
    await pressOnce(result);
    await pressOnce(result);

    await pressOnce(result);

    expect(result.current.phase).toBe(LOGOUT_PHASE.PENDING);
    expect(signOutThisDevice).toHaveBeenCalledOnce();
    await settle(() => pendingSignOut.resolve(SIGN_OUT_OK));
  });

  it("replaces the route with the signed-out login once and stays pending on success", async () => {
    const pendingSignOut = deferSignOutResult();
    vi.mocked(signOutThisDevice).mockReturnValue(
      pendingSignOut.promise
    );
    const { result } = renderHook(useLogoutViewModel);
    await pressOnce(result);
    await pressOnce(result);

    await settle(() => pendingSignOut.resolve(SIGN_OUT_OK));

    expect(replace).toHaveBeenCalledOnce();
    expect(replace).toHaveBeenCalledWith(
      SIGNED_OUT_LOGIN_PATH
    );
    expect(result.current.phase).toBe(LOGOUT_PHASE.PENDING);
  });

  it("fails without navigating when the sign-out is refused", async () => {
    const pendingSignOut = deferSignOutResult();
    vi.mocked(signOutThisDevice).mockReturnValue(
      pendingSignOut.promise
    );
    const { result } = renderHook(useLogoutViewModel);
    await pressOnce(result);
    await pressOnce(result);

    await settle(() =>
      pendingSignOut.resolve(SIGN_OUT_REFUSED)
    );

    expect(result.current.phase).toBe(LOGOUT_PHASE.FAILED);
    expect(result.current.errorMessage).toBe(
      LOGOUT_COPY.ERROR
    );
    expect(result.current.pendingAnnouncement).toBe("");
    expect(replace).not.toHaveBeenCalled();
  });

  it("fails without navigating when the sign-out throws", async () => {
    vi.mocked(signOutThisDevice).mockRejectedValue(
      SIGN_OUT_FAILURE
    );
    const { result } = renderHook(useLogoutViewModel);
    await pressOnce(result);

    await pressOnce(result);

    expect(result.current.phase).toBe(LOGOUT_PHASE.FAILED);
    expect(result.current.errorMessage).toBe(
      LOGOUT_COPY.ERROR
    );
    expect(replace).not.toHaveBeenCalled();
  });

  it("asks for confirmation again after a failure and retries on the next press", async () => {
    vi.mocked(signOutThisDevice).mockResolvedValue(
      SIGN_OUT_REFUSED
    );
    const { result } = renderHook(useLogoutViewModel);
    await pressOnce(result);
    await pressOnce(result);

    await pressOnce(result);

    expect(result.current.phase).toBe(
      LOGOUT_PHASE.CONFIRMING
    );
    expect(result.current.errorMessage).toBeNull();
    expect(signOutThisDevice).toHaveBeenCalledOnce();

    await pressOnce(result);

    expect(signOutThisDevice).toHaveBeenCalledTimes(
      SIGN_OUT_CALL_COUNT.TWO
    );
    expect(result.current.phase).toBe(LOGOUT_PHASE.FAILED);
  });
});
