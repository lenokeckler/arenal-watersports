import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CLIENT_RUNTIME } from "@/app/constants";
import { isVercelRuntime } from "../isVercelRuntime";
import { UNTRUSTED_VERCEL_VALUES } from "./requestEdges.constants";

const stubVercel = (value: string | undefined): void => {
  vi.stubEnv(CLIENT_RUNTIME.VERCEL_ENVIRONMENT_NAME, value);
};

describe("isVercelRuntime", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is true only for the exact Vercel value", () => {
    stubVercel(CLIENT_RUNTIME.VERCEL_ENABLED_VALUE);

    expect(isVercelRuntime()).toBe(true);
  });

  it("is false when the variable is absent", () => {
    stubVercel(undefined);

    expect(isVercelRuntime()).toBe(false);
  });

  it.each(UNTRUSTED_VERCEL_VALUES)(
    "is false for the untrusted value %j",
    (value) => {
      stubVercel(value);

      expect(isVercelRuntime()).toBe(false);
    }
  );
});
