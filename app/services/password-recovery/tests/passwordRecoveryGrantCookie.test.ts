import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { cookies } from "next/headers";
import { PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS } from "@/app/constants";
import { forgetPasswordRecoveryGrant } from "../forgetPasswordRecoveryGrant";
import { readPasswordRecoveryGrant } from "../readPasswordRecoveryGrant";
import { storePasswordRecoveryGrant } from "../storePasswordRecoveryGrant";
import {
  GRANT_COOKIE,
  MALFORMED_GRANT,
} from "./passwordRecoveryGrant.constants";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

const cookieStore = {
  delete: vi.fn(),
  get: vi.fn(),
  set: vi.fn(),
};

describe("password recovery pass cookie", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(cookies).mockResolvedValue(
      cookieStore as never
    );
  });

  it("stores the pass only for the recovery screens, out of reach of scripts", async () => {
    await storePasswordRecoveryGrant(GRANT_COOKIE.VALUE);

    expect(cookieStore.set).toHaveBeenCalledWith(
      GRANT_COOKIE.NAME,
      GRANT_COOKIE.VALUE,
      PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS
    );
    expect(
      PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS
    ).toMatchObject({
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  });

  it("reads a well-formed pass", async () => {
    cookieStore.get.mockReturnValue({
      value: GRANT_COOKIE.VALUE,
    });

    await expect(readPasswordRecoveryGrant()).resolves.toBe(
      GRANT_COOKIE.VALUE
    );
  });

  it("ignores a malformed pass", async () => {
    cookieStore.get.mockReturnValue({
      value: MALFORMED_GRANT,
    });

    await expect(
      readPasswordRecoveryGrant()
    ).resolves.toBeNull();
  });

  it("finds nothing without the cookie", async () => {
    cookieStore.get.mockReturnValue(undefined);

    await expect(
      readPasswordRecoveryGrant()
    ).resolves.toBeNull();
  });

  it("forgets the pass on the same path it was stored", async () => {
    await forgetPasswordRecoveryGrant();

    expect(cookieStore.delete).toHaveBeenCalledWith({
      name: GRANT_COOKIE.NAME,
      path: PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS.path,
    });
  });
});
