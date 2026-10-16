import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CLIENT_RUNTIME,
  NETWORK_KEY,
  NETWORK_KEY_ERROR_CODE,
} from "@/app/constants";
import { deriveClientNetworkKey } from "../deriveClientNetworkKey";
import { NetworkKeyError } from "../NetworkKeyError";
import { readClientNetworkKey } from "../readClientNetworkKey";
import { createHeaders } from "./createHeaders";
import {
  IPV4_ADDRESS,
  SHORT_SECRET,
  SPOOFED_ADDRESS,
  VALID_SECRET,
  VERCEL_HEADER,
} from "./request.constants";

const headersMock = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({ headers: headersMock }));

const stubSecret = (value: string | undefined): void => {
  vi.stubEnv(NETWORK_KEY.SECRET_ENVIRONMENT_NAME, value);
};

const stubVercel = (value: string | undefined): void => {
  vi.stubEnv(CLIENT_RUNTIME.VERCEL_ENVIRONMENT_NAME, value);
};

const captureRejection = (): Promise<unknown> =>
  readClientNetworkKey().then(
    () => {
      throw new Error("expected a rejection");
    },
    (caught: unknown) => caught
  );

describe("readClientNetworkKey", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    headersMock.mockReset();
  });

  it("derives the key from the request address on Vercel", async () => {
    stubSecret(VALID_SECRET);
    stubVercel(CLIENT_RUNTIME.VERCEL_ENABLED_VALUE);
    headersMock.mockResolvedValue(
      createHeaders({ [VERCEL_HEADER]: IPV4_ADDRESS })
    );

    await expect(readClientNetworkKey()).resolves.toBe(
      deriveClientNetworkKey(IPV4_ADDRESS, VALID_SECRET)
    );
  });

  it("ignores a spoofed address off Vercel", async () => {
    stubSecret(VALID_SECRET);
    stubVercel(undefined);
    headersMock.mockResolvedValue(
      createHeaders({ [VERCEL_HEADER]: SPOOFED_ADDRESS })
    );

    await expect(readClientNetworkKey()).resolves.toBe(
      deriveClientNetworkKey(null, VALID_SECRET)
    );
  });

  it("uses the shared bucket when no address arrives", async () => {
    stubSecret(VALID_SECRET);
    stubVercel(CLIENT_RUNTIME.VERCEL_ENABLED_VALUE);
    headersMock.mockResolvedValue(createHeaders({}));

    await expect(readClientNetworkKey()).resolves.toBe(
      deriveClientNetworkKey(null, VALID_SECRET)
    );
  });

  it("fails closed without a secret", async () => {
    stubSecret(undefined);
    headersMock.mockResolvedValue(createHeaders({}));

    const error = await captureRejection();

    expect(error).toBeInstanceOf(NetworkKeyError);
    expect((error as NetworkKeyError).code).toBe(
      NETWORK_KEY_ERROR_CODE.SECRET_MISSING
    );
  });

  it("fails closed with a short secret", async () => {
    stubSecret(SHORT_SECRET);
    headersMock.mockResolvedValue(createHeaders({}));

    const error = await captureRejection();

    expect(error).toBeInstanceOf(NetworkKeyError);
    expect((error as NetworkKeyError).code).toBe(
      NETWORK_KEY_ERROR_CODE.SECRET_TOO_SHORT
    );
  });
});
