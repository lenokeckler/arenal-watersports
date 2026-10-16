import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { NETWORK_KEY } from "@/app/constants";
import { deriveClientNetworkKey } from "../deriveClientNetworkKey";
import { readClientNetworkKey } from "../readClientNetworkKey";
import { createHeaders } from "./createHeaders";
import {
  IPV4_ADDRESS,
  VALID_SECRET,
  VERCEL_HEADER,
} from "./request.constants";

const headersMock = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({ headers: headersMock }));

describe("readClientNetworkKey", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    headersMock.mockReset();
  });

  it("derives the key from the request address", async () => {
    vi.stubEnv(
      NETWORK_KEY.SECRET_ENVIRONMENT_NAME,
      VALID_SECRET
    );
    headersMock.mockResolvedValue(
      createHeaders({ [VERCEL_HEADER]: IPV4_ADDRESS })
    );

    await expect(readClientNetworkKey()).resolves.toBe(
      deriveClientNetworkKey(IPV4_ADDRESS, VALID_SECRET)
    );
  });

  it("uses the shared bucket when no address arrives", async () => {
    vi.stubEnv(
      NETWORK_KEY.SECRET_ENVIRONMENT_NAME,
      VALID_SECRET
    );
    headersMock.mockResolvedValue(createHeaders({}));

    await expect(readClientNetworkKey()).resolves.toBe(
      deriveClientNetworkKey(null, VALID_SECRET)
    );
  });

  it("fails closed without a secret", async () => {
    vi.stubEnv(
      NETWORK_KEY.SECRET_ENVIRONMENT_NAME,
      undefined
    );
    headersMock.mockResolvedValue(createHeaders({}));

    await expect(readClientNetworkKey()).rejects.toThrow();
  });
});
