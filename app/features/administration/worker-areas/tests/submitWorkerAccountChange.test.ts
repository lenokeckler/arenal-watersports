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
  WORKER_ACCOUNT_ACTION,
  WORKER_ACCOUNT_FIELD,
  WORKER_ACCOUNT_RESULT,
  WORKER_AREA_FIELD,
} from "@/app/constants";
import { changeWorkerAccountAsSignedIn } from "@/app/services/worker-areas";
import { submitWorkerAccountChange } from "../actions/submitWorkerAccountChange";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("redirected");
  }),
}));

vi.mock("@/app/services/worker-areas", () => ({
  changeWorkerAccountAsSignedIn: vi.fn(),
}));

const WORKER_ID = "33333333-3333-3333-3333-333333333333";
const USERNAME = "celso";

const buildFormData = (
  overrides: Record<string, string> = {}
): FormData => {
  const formData = new FormData();
  Object.entries({
    [WORKER_ACCOUNT_FIELD.ACTION]:
      WORKER_ACCOUNT_ACTION.BLOCK,
    [WORKER_AREA_FIELD.USERNAME]: USERNAME,
    [WORKER_AREA_FIELD.WORKER_ID]: WORKER_ID,
    ...overrides,
  }).forEach(([name, value]) => formData.set(name, value));

  return formData;
};

describe("submitWorkerAccountChange", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    [
      WORKER_ACCOUNT_ACTION.BLOCK,
      WORKER_ACCOUNT_RESULT.BLOCKED,
    ],
    [
      WORKER_ACCOUNT_ACTION.UNLOCK,
      WORKER_ACCOUNT_RESULT.UNLOCKED,
    ],
  ])(
    "applies %s and returns to the worker with its notice",
    async (action, result) => {
      vi.mocked(
        changeWorkerAccountAsSignedIn
      ).mockResolvedValue(result);

      await expect(
        submitWorkerAccountChange(
          null,
          buildFormData({
            [WORKER_ACCOUNT_FIELD.ACTION]: action,
          })
        )
      ).rejects.toThrow();
      expect(
        changeWorkerAccountAsSignedIn
      ).toHaveBeenCalledWith({
        action,
        workerId: WORKER_ID,
      });
      expect(redirect).toHaveBeenCalledWith(
        `${PATHS.ADMINISTRATION.WORKER_AREAS}?${WORKER_AREA_FIELD.USERNAME}=${USERNAME}&${WORKER_ACCOUNT_FIELD.ACCOUNT_NOTICE}=${result}`
      );
    }
  );

  it.each([
    [{ [WORKER_ACCOUNT_FIELD.ACTION]: "delete" }],
    [{ [WORKER_AREA_FIELD.WORKER_ID]: "" }],
    [{ [WORKER_AREA_FIELD.USERNAME]: "" }],
  ])(
    "changes nothing for the form %j",
    async (overrides) => {
      expect(
        await submitWorkerAccountChange(
          null,
          buildFormData(overrides)
        )
      ).toBe(WORKER_ACCOUNT_RESULT.FAILED);
      expect(
        changeWorkerAccountAsSignedIn
      ).not.toHaveBeenCalled();
    }
  );

  it.each([
    WORKER_ACCOUNT_RESULT.ADMIN_ACCOUNT,
    WORKER_ACCOUNT_RESULT.RETIRED,
    WORKER_ACCOUNT_RESULT.NOT_ALLOWED,
    WORKER_ACCOUNT_RESULT.NOT_FOUND,
  ])(
    "answers the refusal %s to the form",
    async (result) => {
      vi.mocked(
        changeWorkerAccountAsSignedIn
      ).mockResolvedValue(result);

      expect(
        await submitWorkerAccountChange(
          null,
          buildFormData()
        )
      ).toBe(result);
      expect(redirect).not.toHaveBeenCalled();
    }
  );
});
