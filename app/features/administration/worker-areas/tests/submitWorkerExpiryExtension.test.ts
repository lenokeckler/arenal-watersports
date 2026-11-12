import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import {
  PATHS,
  WORKER_ACCOUNT_FIELD,
  WORKER_ACCOUNT_RESULT,
  WORKER_AREA_FIELD,
} from "@/app/constants";
import { extendWorkerExpiryAsSignedIn } from "@/app/services/worker-areas";
import { submitWorkerExpiryExtension } from "../actions/submitWorkerExpiryExtension";
import { WORKER_EXPIRY_TEST } from "./WorkerExpiry.constants";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("redirected");
  }),
}));

vi.mock("@/app/services/worker-areas", () => ({
  extendWorkerExpiryAsSignedIn: vi.fn(),
}));

const buildFormData = (
  overrides: Record<string, string> = {}
): FormData => {
  const formData = new FormData();
  Object.entries({
    [WORKER_ACCOUNT_FIELD.EXPIRES_ON]:
      WORKER_EXPIRY_TEST.NEW_DATE,
    [WORKER_AREA_FIELD.USERNAME]:
      WORKER_EXPIRY_TEST.USERNAME,
    [WORKER_AREA_FIELD.WORKER_ID]:
      WORKER_EXPIRY_TEST.WORKER_ID,
    ...overrides,
  }).forEach(([name, value]) => formData.set(name, value));

  return formData;
};

describe("submitWorkerExpiryExtension", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("extends the expiry to the end of the chosen day and goes back with the notice", async () => {
    vi.mocked(
      extendWorkerExpiryAsSignedIn
    ).mockResolvedValue(WORKER_ACCOUNT_RESULT.EXTENDED);

    await expect(
      submitWorkerExpiryExtension(null, buildFormData())
    ).rejects.toThrow("redirected");
    expect(
      extendWorkerExpiryAsSignedIn
    ).toHaveBeenCalledWith({
      expiresAt: WORKER_EXPIRY_TEST.NEW_TIMESTAMP,
      workerId: WORKER_EXPIRY_TEST.WORKER_ID,
    });
    expect(redirect).toHaveBeenCalledWith(
      `${PATHS.ADMINISTRATION.WORKER_AREAS}?${WORKER_AREA_FIELD.USERNAME}=${WORKER_EXPIRY_TEST.USERNAME}&${WORKER_ACCOUNT_FIELD.ACCOUNT_NOTICE}=${WORKER_ACCOUNT_RESULT.EXTENDED}`
    );
  });

  it.each([
    [WORKER_ACCOUNT_RESULT.INVALID_DATE],
    [WORKER_ACCOUNT_RESULT.NOT_ALLOWED],
    [WORKER_ACCOUNT_RESULT.NOT_EXTERNAL_GUIDE],
    [WORKER_ACCOUNT_RESULT.NOT_FOUND],
  ])(
    "returns the refusal %s without leaving the screen",
    async (refusal) => {
      vi.mocked(
        extendWorkerExpiryAsSignedIn
      ).mockResolvedValue(refusal);

      expect(
        await submitWorkerExpiryExtension(
          null,
          buildFormData()
        )
      ).toBe(refusal);
      expect(redirect).not.toHaveBeenCalled();
    }
  );

  it.each([
    [{ [WORKER_ACCOUNT_FIELD.EXPIRES_ON]: "" }],
    [{ [WORKER_ACCOUNT_FIELD.EXPIRES_ON]: "2026-02-31" }],
    [{ [WORKER_ACCOUNT_FIELD.EXPIRES_ON]: "tomorrow" }],
  ])(
    "refuses an invalid date for the form %j before calling the server",
    async (overrides) => {
      expect(
        await submitWorkerExpiryExtension(
          null,
          buildFormData(overrides)
        )
      ).toBe(WORKER_ACCOUNT_RESULT.INVALID_DATE);
      expect(
        extendWorkerExpiryAsSignedIn
      ).not.toHaveBeenCalled();
    }
  );

  it.each([
    [{ [WORKER_AREA_FIELD.WORKER_ID]: "" }],
    [{ [WORKER_AREA_FIELD.USERNAME]: "" }],
  ])(
    "changes nothing for the form %j",
    async (overrides) => {
      expect(
        await submitWorkerExpiryExtension(
          null,
          buildFormData(overrides)
        )
      ).toBe(WORKER_ACCOUNT_RESULT.FAILED);
      expect(
        extendWorkerExpiryAsSignedIn
      ).not.toHaveBeenCalled();
    }
  );
});
