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
  SUPABASE_WORKER_MARK,
  WORKER_AREA_FIELD,
  WORKER_AREA_INTENT,
  WORKER_MARK_CHANGE_RESULT,
  WORKER_MARK_FIELD,
} from "@/app/constants";
import { changeWorkerMarkAsSignedIn } from "@/app/services/worker-areas";
import { submitWorkerMarkChange } from "../actions/submitWorkerMarkChange";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("redirected");
  }),
}));

vi.mock("@/app/services/worker-areas", () => ({
  changeWorkerMarkAsSignedIn: vi.fn(),
}));

const WORKER_ID = "33333333-3333-3333-3333-333333333333";
const USERNAME = "celso";

const buildFormData = (
  overrides: Record<string, string> = {}
): FormData => {
  const formData = new FormData();
  Object.entries({
    [WORKER_MARK_FIELD.MARK]: SUPABASE_WORKER_MARK.GUIDE,
    [WORKER_AREA_FIELD.INTENT]: WORKER_AREA_INTENT.GRANT,
    [WORKER_AREA_FIELD.USERNAME]: USERNAME,
    [WORKER_AREA_FIELD.WORKER_ID]: WORKER_ID,
    ...overrides,
  }).forEach(([name, value]) => formData.set(name, value));

  return formData;
};

describe("submitWorkerMarkChange", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    [
      WORKER_AREA_INTENT.GRANT,
      WORKER_MARK_CHANGE_RESULT.GRANTED,
    ],
    [
      WORKER_AREA_INTENT.REVOKE,
      WORKER_MARK_CHANGE_RESULT.REVOKED,
    ],
  ])(
    "applies the %s and returns to the worker with its notice",
    async (intent, result) => {
      vi.mocked(
        changeWorkerMarkAsSignedIn
      ).mockResolvedValue(result);

      await expect(
        submitWorkerMarkChange(
          null,
          buildFormData({
            [WORKER_AREA_FIELD.INTENT]: intent,
          })
        )
      ).rejects.toThrow();
      expect(
        changeWorkerMarkAsSignedIn
      ).toHaveBeenCalledWith({
        intent,
        mark: SUPABASE_WORKER_MARK.GUIDE,
        workerId: WORKER_ID,
      });
      expect(redirect).toHaveBeenCalledWith(
        `${PATHS.ADMINISTRATION.WORKER_AREAS}?${WORKER_AREA_FIELD.USERNAME}=${USERNAME}&${WORKER_MARK_FIELD.MARK_NOTICE}=${intent}&${WORKER_MARK_FIELD.MARK}=${SUPABASE_WORKER_MARK.GUIDE}`
      );
    }
  );

  it.each([
    [
      {
        [WORKER_MARK_FIELD.MARK]:
          SUPABASE_WORKER_MARK.EXTERNAL_GUIDE_REGISTRATION,
      },
    ],
    [{ [WORKER_AREA_FIELD.INTENT]: "toggle" }],
    [{ [WORKER_AREA_FIELD.WORKER_ID]: "" }],
    [{ [WORKER_AREA_FIELD.USERNAME]: "" }],
  ])(
    "changes nothing for the form %j",
    async (overrides) => {
      expect(
        await submitWorkerMarkChange(
          null,
          buildFormData(overrides)
        )
      ).toBe(WORKER_MARK_CHANGE_RESULT.FAILED);
      expect(
        changeWorkerMarkAsSignedIn
      ).not.toHaveBeenCalled();
    }
  );

  it.each([
    WORKER_MARK_CHANGE_RESULT.NOT_ALLOWED,
    WORKER_MARK_CHANGE_RESULT.EXTERNAL_GUIDE,
    WORKER_MARK_CHANGE_RESULT.NOT_FOUND,
    WORKER_MARK_CHANGE_RESULT.MARK_NOT_GRANTABLE,
    WORKER_MARK_CHANGE_RESULT.FAILED,
  ])(
    "answers the refusal %s to the form",
    async (result) => {
      vi.mocked(
        changeWorkerMarkAsSignedIn
      ).mockResolvedValue(result);

      expect(
        await submitWorkerMarkChange(null, buildFormData())
      ).toBe(result);
      expect(redirect).not.toHaveBeenCalled();
    }
  );
});
