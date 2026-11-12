import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SIGN_OUT } from "@/app/constants";
import { listAuthCookieNames } from "@/app/utils/supabase-cookie/listAuthCookieNames";
import { signOutThisDevice } from "../signOutThisDevice";
import { SIGN_OUT_FIXTURE } from "./signOutThisDevice.constants";
import {
  arrangeLibraryAtRest,
  clearAllCookies,
  getSession,
  signOut,
  supabase,
  writeAuthCookie,
} from "./signOutThisDevice.setup";

const NEVER_SETTLES = (): Promise<never> =>
  new Promise<never>(() => undefined);

const readRemainingAuthCookies = (): string[] =>
  listAuthCookieNames(
    document.cookie,
    SIGN_OUT_FIXTURE.AUTH_COOKIE_NAME
  );

const passTheTimeLimit = async (
  times: number = 1
): Promise<void> => {
  await vi.advanceTimersByTimeAsync(
    SIGN_OUT.TIME_LIMIT_MS * times
  );
};

describe("signOutThisDevice time limit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    arrangeLibraryAtRest();
  });

  afterEach(() => {
    vi.useRealTimers();
    clearAllCookies();
  });

  it("removes the auth cookies itself when signOut never settles", async () => {
    writeAuthCookie();
    signOut.mockReturnValue(NEVER_SETTLES());
    const result = signOutThisDevice(supabase);

    await passTheTimeLimit();

    await expect(result).resolves.toEqual({ ok: true });
    expect(readRemainingAuthCookies()).toEqual([]);
  });

  it("goes straight to the fallback when signOut timed out", async () => {
    signOut.mockReturnValue(NEVER_SETTLES());
    const result = signOutThisDevice(supabase);

    await passTheTimeLimit();
    await result;

    expect(getSession).not.toHaveBeenCalled();
  });

  it("removes the auth cookies when the first getSession never settles", async () => {
    writeAuthCookie();
    getSession.mockReturnValue(NEVER_SETTLES());
    const result = signOutThisDevice(supabase);

    await passTheTimeLimit();

    await expect(result).resolves.toEqual({ ok: true });
    expect(readRemainingAuthCookies()).toEqual([]);
  });

  it("reports ok from the cookies while getSession waits for the hung signOut", async () => {
    writeAuthCookie();
    let releaseSignOut: () => void = () => undefined;
    const hungSignOut = new Promise<{ error: null }>(
      (resolve) => {
        releaseSignOut = () => resolve({ error: null });
      }
    );
    signOut.mockReturnValue(hungSignOut);
    getSession.mockReturnValue(
      hungSignOut.then(() => ({
        data: { session: null },
        error: null,
      }))
    );
    const result = signOutThisDevice(supabase);

    await passTheTimeLimit();
    await expect(result).resolves.toEqual({ ok: true });
    releaseSignOut();

    expect(readRemainingAuthCookies()).toEqual([]);
  });

  it("does not settle before the time limit", async () => {
    signOut.mockReturnValue(NEVER_SETTLES());
    const onSettled = vi.fn();
    void signOutThisDevice(supabase).then(onSettled);

    await vi.advanceTimersByTimeAsync(
      SIGN_OUT.TIME_LIMIT_MS - 1
    );

    expect(onSettled).not.toHaveBeenCalled();
  });

  it("leaves no unhandled rejection when the hung signOut fails late", async () => {
    let failLate: (reason: Error) => void = () => undefined;
    signOut.mockReturnValue(
      new Promise((_, reject) => {
        failLate = reject;
      })
    );
    const result = signOutThisDevice(supabase);

    await passTheTimeLimit();
    failLate(
      new Error(SIGN_OUT_FIXTURE.NETWORK_FAILURE_MESSAGE)
    );
    await passTheTimeLimit(0);

    await expect(result).resolves.toEqual({ ok: true });
  });
});
