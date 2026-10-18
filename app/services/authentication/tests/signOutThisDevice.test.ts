import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SIGN_OUT_TIME_LIMIT_MS,
  SUPABASE_SIGN_OUT_SCOPE,
} from "@/app/constants";
import type { BrowserSupabaseClient } from "@/app/services/supabase/models/BrowserSupabaseClient.type";
import { listAuthCookieNames } from "@/app/utils/supabase-cookie/listAuthCookieNames";
import { deriveLegacyAuthCookieName } from "@/app/utils/supabase-cookie/deriveLegacyAuthCookieName";
import { signOutThisDevice } from "../signOutThisDevice";
import { SIGN_OUT_FIXTURE } from "./signOutThisDevice.constants";

const signOut = vi.fn();
const getSession = vi.fn();
const supabase = {
  auth: { signOut, getSession },
} as unknown as BrowserSupabaseClient;

const writeAuthCookie = (): void => {
  document.cookie = `${SIGN_OUT_FIXTURE.AUTH_COOKIE_NAME}=${SIGN_OUT_FIXTURE.AUTH_COOKIE_VALUE}; path=/`;
  document.cookie = `${SIGN_OUT_FIXTURE.UNRELATED_COOKIE}; path=/`;
};

const clearAllCookies = (): void => {
  document.cookie.split(";").forEach((pair) => {
    const name = pair.split("=")[0].trim();
    document.cookie = `${name}=; path=/; max-age=0`;
  });
};

const buildSessionWithUnreadableUser = () => {
  const session = { ...SIGN_OUT_FIXTURE.SESSION };
  Object.defineProperty(session, "user", {
    get: () => {
      throw new Error(
        SIGN_OUT_FIXTURE.UNREADABLE_USER_MESSAGE
      );
    },
  });

  return session;
};

describe("signOutThisDevice", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    clearAllCookies();
    signOut.mockResolvedValue({ error: null });
    getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });
  });

  afterEach(clearAllCookies);

  it("signs out with the local scope only", async () => {
    await signOutThisDevice(supabase);

    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith({
      scope: SUPABASE_SIGN_OUT_SCOPE.LOCAL,
    });
    expect(signOut).not.toHaveBeenCalledWith({
      scope: SUPABASE_SIGN_OUT_SCOPE.GLOBAL,
    });
  });

  it("reports ok when no session is left", async () => {
    await expect(
      signOutThisDevice(supabase)
    ).resolves.toEqual({
      ok: true,
    });
  });

  it("reports ok when the server failed but no session is left", async () => {
    signOut.mockResolvedValue({
      error: new Error(SIGN_OUT_FIXTURE.ERROR_MESSAGE),
    });

    await expect(
      signOutThisDevice(supabase)
    ).resolves.toEqual({
      ok: true,
    });
  });

  it("leaves the cookies alone when the library already removed the session", async () => {
    writeAuthCookie();

    await signOutThisDevice(supabase);

    expect(
      listAuthCookieNames(
        document.cookie,
        SIGN_OUT_FIXTURE.AUTH_COOKIE_NAME
      )
    ).toEqual([SIGN_OUT_FIXTURE.AUTH_COOKIE_NAME]);
  });

  it("always expires the legacy cookie, even when the library removed the session", async () => {
    document.cookie = `${deriveLegacyAuthCookieName()}=${SIGN_OUT_FIXTURE.AUTH_COOKIE_VALUE}; path=/`;

    await signOutThisDevice(supabase);

    expect(document.cookie).not.toContain(
      deriveLegacyAuthCookieName()
    );
  });

  it("expires the legacy chunks even when the library removed the session", async () => {
    const legacyName = deriveLegacyAuthCookieName();
    document.cookie = `${legacyName}${SIGN_OUT_FIXTURE.FIRST_CHUNK_SUFFIX}=${SIGN_OUT_FIXTURE.AUTH_COOKIE_VALUE}; path=/`;
    document.cookie = `${legacyName}${SIGN_OUT_FIXTURE.SECOND_CHUNK_SUFFIX}=${SIGN_OUT_FIXTURE.AUTH_COOKIE_VALUE}; path=/`;

    await signOutThisDevice(supabase);

    expect(
      listAuthCookieNames(document.cookie, legacyName)
    ).toEqual([]);
  });

  it("never expires another project or a non-numeric legacy suffix", async () => {
    const legacyName = deriveLegacyAuthCookieName();
    document.cookie = `${SIGN_OUT_FIXTURE.OTHER_PROJECT_COOKIE}=keep; path=/`;
    document.cookie = `${legacyName}${SIGN_OUT_FIXTURE.NON_NUMERIC_SUFFIX}=keep; path=/`;

    await signOutThisDevice(supabase);

    expect(document.cookie).toContain(
      SIGN_OUT_FIXTURE.OTHER_PROJECT_COOKIE
    );
    expect(document.cookie).toContain(
      `${legacyName}${SIGN_OUT_FIXTURE.NON_NUMERIC_SUFFIX}`
    );
  });

  it("removes the auth cookies and checks again when the session cannot be read", async () => {
    writeAuthCookie();
    getSession
      .mockResolvedValueOnce({
        data: { session: null },
        error: new Error(
          SIGN_OUT_FIXTURE.NETWORK_FAILURE_MESSAGE
        ),
      })
      .mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });

    const result = await signOutThisDevice(supabase);

    expect(getSession).toHaveBeenCalledTimes(2);
    expect(
      listAuthCookieNames(
        document.cookie,
        SIGN_OUT_FIXTURE.AUTH_COOKIE_NAME
      )
    ).toEqual([]);
    expect(document.cookie).toContain(
      SIGN_OUT_FIXTURE.UNRELATED_COOKIE
    );
    expect(result).toEqual({ ok: true });
  });

  it("removes the auth cookies when a session is still held and reports ok once it is gone", async () => {
    writeAuthCookie();
    getSession
      .mockResolvedValueOnce({
        data: { session: SIGN_OUT_FIXTURE.SESSION },
        error: null,
      })
      .mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });

    const result = await signOutThisDevice(supabase);

    expect(
      listAuthCookieNames(
        document.cookie,
        SIGN_OUT_FIXTURE.AUTH_COOKIE_NAME
      )
    ).toEqual([]);
    expect(result).toEqual({ ok: true });
  });

  it("reports failure when the session is still there after the fallback", async () => {
    getSession.mockResolvedValue({
      data: { session: SIGN_OUT_FIXTURE.SESSION },
      error: null,
    });

    await expect(
      signOutThisDevice(supabase)
    ).resolves.toEqual({
      ok: false,
    });
  });

  it("reports failure when the session still cannot be read after the fallback", async () => {
    getSession.mockResolvedValue({
      data: { session: null },
      error: new Error(
        SIGN_OUT_FIXTURE.NETWORK_FAILURE_MESSAGE
      ),
    });

    await expect(
      signOutThisDevice(supabase)
    ).resolves.toEqual({
      ok: false,
    });
  });

  it("propagates an exception thrown by the client", async () => {
    signOut.mockRejectedValue(
      new Error(SIGN_OUT_FIXTURE.NETWORK_FAILURE_MESSAGE)
    );

    await expect(
      signOutThisDevice(supabase)
    ).rejects.toThrow(
      SIGN_OUT_FIXTURE.NETWORK_FAILURE_MESSAGE
    );
  });

  it("never reads the user of the session", async () => {
    getSession.mockResolvedValue({
      data: { session: buildSessionWithUnreadableUser() },
      error: null,
    });

    await expect(
      signOutThisDevice(supabase)
    ).resolves.toEqual({
      ok: false,
    });
  });

  describe("when the library hangs", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("falls back to removing the cookies when signOut never settles", async () => {
      writeAuthCookie();
      signOut.mockReturnValue(new Promise(() => undefined));
      const result = signOutThisDevice(supabase);

      await vi.advanceTimersByTimeAsync(
        SIGN_OUT_TIME_LIMIT_MS
      );

      await expect(result).resolves.toEqual({ ok: true });
    });

    it("goes straight to the fallback when signOut timed out", async () => {
      signOut.mockReturnValue(new Promise(() => undefined));
      const result = signOutThisDevice(supabase);

      await vi.advanceTimersByTimeAsync(
        SIGN_OUT_TIME_LIMIT_MS
      );

      await expect(result).resolves.toEqual({ ok: true });
      expect(getSession).toHaveBeenCalledTimes(1);
    });

    it("removes the auth cookies when getSession never settles", async () => {
      writeAuthCookie();
      getSession
        .mockReturnValueOnce(new Promise(() => undefined))
        .mockResolvedValueOnce({
          data: { session: null },
          error: null,
        });
      const result = signOutThisDevice(supabase);

      await vi.advanceTimersByTimeAsync(
        SIGN_OUT_TIME_LIMIT_MS
      );

      await expect(result).resolves.toEqual({ ok: true });
      expect(
        listAuthCookieNames(
          document.cookie,
          SIGN_OUT_FIXTURE.AUTH_COOKIE_NAME
        )
      ).toEqual([]);
    });

    it("reports failure when the final check also never settles", async () => {
      getSession.mockReturnValue(
        new Promise(() => undefined)
      );
      const result = signOutThisDevice(supabase);

      await vi.advanceTimersByTimeAsync(
        SIGN_OUT_TIME_LIMIT_MS * 3
      );

      await expect(result).resolves.toEqual({ ok: false });
    });

    it("never waits longer than two limits in total", async () => {
      signOut.mockReturnValue(new Promise(() => undefined));
      getSession.mockReturnValue(
        new Promise(() => undefined)
      );
      const onSettled = vi.fn();
      void signOutThisDevice(supabase).then(onSettled);

      await vi.advanceTimersByTimeAsync(
        SIGN_OUT_TIME_LIMIT_MS * 2
      );

      expect(onSettled).toHaveBeenCalledWith({ ok: false });
    });

    it("leaves no unhandled rejection when the hung signOut fails late", async () => {
      let failLate: (reason: Error) => void = () =>
        undefined;
      signOut.mockReturnValue(
        new Promise((_, reject) => {
          failLate = reject;
        })
      );
      const result = signOutThisDevice(supabase);

      await vi.advanceTimersByTimeAsync(
        SIGN_OUT_TIME_LIMIT_MS
      );
      failLate(
        new Error(SIGN_OUT_FIXTURE.NETWORK_FAILURE_MESSAGE)
      );
      await vi.advanceTimersByTimeAsync(0);

      await expect(result).resolves.toEqual({ ok: true });
    });
  });
});
