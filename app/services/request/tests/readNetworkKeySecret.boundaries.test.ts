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
  SECRET_ABOVE_MINIMUM,
  SECRET_AT_MINIMUM,
  SECRET_BELOW_MINIMUM,
  SECRET_PADDING,
  SECRET_PADDING_TAB_NEWLINE,
  SECRET_WITH_INNER_SPACES,
  SECRET_WITH_INNER_SPACES_SHORT,
  SHORT_AFTER_TRIM,
  SHORT_WITH_LEADING_SPACES,
} from "./requestEdges.constants";

const stubSecret = (value: string): void => {
  vi.stubEnv(NETWORK_KEY.SECRET_ENVIRONMENT_NAME, value);
};

describe("readNetworkKeySecret boundaries", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("rejects a secret one character below the minimum", () => {
    stubSecret(SECRET_BELOW_MINIMUM);

    expect(
      captureNetworkKeyError(readNetworkKeySecret).code
    ).toBe(NETWORK_KEY_ERROR_CODE.SECRET_TOO_SHORT);
  });

  it("accepts a secret of exactly the minimum length", () => {
    stubSecret(SECRET_AT_MINIMUM);

    expect(readNetworkKeySecret()).toBe(SECRET_AT_MINIMUM);
  });

  it("accepts a secret one character above the minimum", () => {
    stubSecret(SECRET_ABOVE_MINIMUM);

    expect(readNetworkKeySecret()).toBe(
      SECRET_ABOVE_MINIMUM
    );
  });

  it("counts inner spaces toward the length", () => {
    stubSecret(SECRET_WITH_INNER_SPACES);

    expect(readNetworkKeySecret()).toBe(
      SECRET_WITH_INNER_SPACES
    );
  });

  it("rejects a spaced secret that is too short", () => {
    stubSecret(SECRET_WITH_INNER_SPACES_SHORT);

    expect(
      captureNetworkKeyError(readNetworkKeySecret).code
    ).toBe(NETWORK_KEY_ERROR_CODE.SECRET_TOO_SHORT);
  });

  it("measures the length after trimming the padding", () => {
    stubSecret(SHORT_AFTER_TRIM);

    expect(
      captureNetworkKeyError(readNetworkKeySecret).code
    ).toBe(NETWORK_KEY_ERROR_CODE.SECRET_TOO_SHORT);
  });

  it("does not let leading spaces pad a short secret to the minimum", () => {
    stubSecret(SHORT_WITH_LEADING_SPACES);

    expect(
      captureNetworkKeyError(readNetworkKeySecret).code
    ).toBe(NETWORK_KEY_ERROR_CODE.SECRET_TOO_SHORT);
  });

  it("returns the trimmed secret when spaces surround a valid one", () => {
    stubSecret(
      `${SECRET_PADDING}${SECRET_AT_MINIMUM}${SECRET_PADDING}`
    );

    expect(readNetworkKeySecret()).toBe(SECRET_AT_MINIMUM);
  });

  it("trims tabs and newlines around the secret", () => {
    stubSecret(
      `${SECRET_PADDING_TAB_NEWLINE}${SECRET_AT_MINIMUM}${SECRET_PADDING_TAB_NEWLINE}`
    );

    expect(readNetworkKeySecret()).toBe(SECRET_AT_MINIMUM);
  });
});
