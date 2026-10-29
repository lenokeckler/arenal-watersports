import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { cookies } from "next/headers";
import {
  PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS,
  PASSWORD_RECOVERY_USERNAME_COOKIE,
} from "@/app/constants";
import { readPasswordRecoveryUsername } from "../readPasswordRecoveryUsername";
import { storePasswordRecoveryUsername } from "../storePasswordRecoveryUsername";
import { USERNAME_COOKIE } from "./passwordRecoveryUsername.constants";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

const cookieStore = {
  get: vi.fn(),
  set: vi.fn(),
};

describe("password recovery username cookie", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(cookies).mockResolvedValue(
      cookieStore as never
    );
  });

  it("stores the normalized username only for the recovery screens, out of reach of scripts", async () => {
    await storePasswordRecoveryUsername(
      USERNAME_COOKIE.RAW
    );

    expect(cookieStore.set).toHaveBeenCalledWith(
      USERNAME_COOKIE.NAME,
      USERNAME_COOKIE.NORMALIZED,
      PASSWORD_RECOVERY_USERNAME_COOKIE.OPTIONS
    );
    expect(PASSWORD_RECOVERY_USERNAME_COOKIE.OPTIONS).toBe(
      PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS
    );
  });

  it("reads the stored username", async () => {
    cookieStore.get.mockReturnValue({
      value: USERNAME_COOKIE.NORMALIZED,
    });

    await expect(
      readPasswordRecoveryUsername()
    ).resolves.toBe(USERNAME_COOKIE.NORMALIZED);
  });

  it("finds nothing without the cookie", async () => {
    cookieStore.get.mockReturnValue(undefined);

    await expect(
      readPasswordRecoveryUsername()
    ).resolves.toBeUndefined();
  });
});
