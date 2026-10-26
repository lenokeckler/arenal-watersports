import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { signOutThisDevice } from "@/app/services/authentication/signOutThisDevice";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import type { BrowserSupabaseClient } from "@/app/services/supabase/models/BrowserSupabaseClient.type";
import { attemptSignOutThisDevice } from "../attemptSignOutThisDevice";
import {
  SIGN_OUT_FAILURE,
  SIGN_OUT_OK,
  SIGN_OUT_REFUSED,
} from "./attemptSignOutThisDevice.constants";

vi.mock(
  "@/app/services/authentication/signOutThisDevice",
  () => ({ signOutThisDevice: vi.fn() })
);

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: vi.fn(),
}));

describe("attemptSignOutThisDevice", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("signs out with the browser client", async () => {
    const browserClient = {} as BrowserSupabaseClient;
    let receivedClient: BrowserSupabaseClient | null = null;
    vi.mocked(createBrowserSupabaseClient).mockReturnValue(
      browserClient
    );
    vi.mocked(signOutThisDevice).mockImplementation(
      (client) => {
        receivedClient = client;

        return Promise.resolve(SIGN_OUT_OK);
      }
    );

    await attemptSignOutThisDevice();

    expect(receivedClient).toBe(browserClient);
  });

  it("returns true when the service reports ok", async () => {
    vi.mocked(signOutThisDevice).mockResolvedValue(
      SIGN_OUT_OK
    );

    expect(await attemptSignOutThisDevice()).toBe(true);
  });

  it("returns false when the service reports not ok", async () => {
    vi.mocked(signOutThisDevice).mockResolvedValue(
      SIGN_OUT_REFUSED
    );

    expect(await attemptSignOutThisDevice()).toBe(false);
  });

  it("returns false when the service throws", async () => {
    vi.mocked(signOutThisDevice).mockRejectedValue(
      SIGN_OUT_FAILURE
    );

    expect(await attemptSignOutThisDevice()).toBe(false);
  });

  it("returns false without signing out when creating the client throws", async () => {
    vi.mocked(
      createBrowserSupabaseClient
    ).mockImplementation(() => {
      throw SIGN_OUT_FAILURE;
    });

    expect(await attemptSignOutThisDevice()).toBe(false);
    expect(signOutThisDevice).not.toHaveBeenCalled();
  });
});
