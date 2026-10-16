import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  NETWORK_KEY,
  NETWORK_KEY_ERROR_CODE,
} from "@/app/constants";
import { readNetworkKeySecret } from "../readNetworkKeySecret";
import { captureNetworkKeyError } from "./captureNetworkKeyError";
import {
  BLANK_SECRET,
  PADDED_SHORT_SECRET,
  SHORT_SECRET,
  VALID_SECRET,
} from "./request.constants";

const stubSecret = (value: string): void => {
  vi.stubEnv(NETWORK_KEY.SECRET_ENVIRONMENT_NAME, value);
};

describe("readNetworkKeySecret", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns a secret of the minimum length", () => {
    stubSecret(VALID_SECRET);

    expect(readNetworkKeySecret()).toBe(VALID_SECRET);
  });

  it("throws a code-only error when the secret is missing", () => {
    vi.stubEnv(
      NETWORK_KEY.SECRET_ENVIRONMENT_NAME,
      undefined
    );

    const error = captureNetworkKeyError(
      readNetworkKeySecret
    );

    expect(error.code).toBe(
      NETWORK_KEY_ERROR_CODE.SECRET_MISSING
    );
  });

  it("treats a blank secret as missing", () => {
    stubSecret(BLANK_SECRET);

    expect(
      captureNetworkKeyError(readNetworkKeySecret).code
    ).toBe(NETWORK_KEY_ERROR_CODE.SECRET_MISSING);
  });

  it.each([SHORT_SECRET, PADDED_SHORT_SECRET])(
    "rejects a short secret without echoing it",
    (secret) => {
      stubSecret(secret);

      const error = captureNetworkKeyError(
        readNetworkKeySecret
      );

      expect(error.code).toBe(
        NETWORK_KEY_ERROR_CODE.SECRET_TOO_SHORT
      );
      expect(error.message).toBe(error.code);
      expect(error.message).not.toContain(secret.trim());
    }
  );
});
