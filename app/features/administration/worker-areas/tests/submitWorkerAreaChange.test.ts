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
  SUPABASE_WORK_AREA,
  WORKER_AREA_CHANGE_RESULT,
  WORKER_AREA_FIELD,
  WORKER_AREA_INTENT,
} from "@/app/constants";
import { changeWorkerAreaAsSignedIn } from "@/app/services/worker-areas";
import { submitWorkerAreaChange } from "../actions/submitWorkerAreaChange";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("redirected");
  }),
}));

vi.mock("@/app/services/worker-areas", () => ({
  changeWorkerAreaAsSignedIn: vi.fn(),
}));

const WORKER_ID = "33333333-3333-3333-3333-333333333333";
const USERNAME = "celso";

const buildFormData = (
  overrides: Record<string, string> = {}
): FormData => {
  const formData = new FormData();
  Object.entries({
    [WORKER_AREA_FIELD.AREA]:
      SUPABASE_WORK_AREA.RESERVATIONS,
    [WORKER_AREA_FIELD.INTENT]: WORKER_AREA_INTENT.GRANT,
    [WORKER_AREA_FIELD.USERNAME]: USERNAME,
    [WORKER_AREA_FIELD.WORKER_ID]: WORKER_ID,
    ...overrides,
  }).forEach(([name, value]) => formData.set(name, value));

  return formData;
};

describe("submitWorkerAreaChange", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    [
      WORKER_AREA_INTENT.GRANT,
      WORKER_AREA_CHANGE_RESULT.GRANTED,
    ],
    [
      WORKER_AREA_INTENT.REVOKE,
      WORKER_AREA_CHANGE_RESULT.REVOKED,
    ],
  ])(
    "applies the %s and returns to the worker with its notice",
    async (intent, result) => {
      vi.mocked(
        changeWorkerAreaAsSignedIn
      ).mockResolvedValue(result);

      await expect(
        submitWorkerAreaChange(
          null,
          buildFormData({
            [WORKER_AREA_FIELD.INTENT]: intent,
          })
        )
      ).rejects.toThrow();
      expect(
        changeWorkerAreaAsSignedIn
      ).toHaveBeenCalledWith({
        area: SUPABASE_WORK_AREA.RESERVATIONS,
        intent,
        workerId: WORKER_ID,
      });
      expect(redirect).toHaveBeenCalledWith(
        `${PATHS.ADMINISTRATION.WORKER_AREAS}?${WORKER_AREA_FIELD.USERNAME}=${USERNAME}&${WORKER_AREA_FIELD.NOTICE}=${intent}&${WORKER_AREA_FIELD.AREA}=${SUPABASE_WORK_AREA.RESERVATIONS}`
      );
    }
  );

  it.each([
    [
      {
        [WORKER_AREA_FIELD.AREA]:
          SUPABASE_WORK_AREA.ADMINISTRATION,
      },
    ],
    [{ [WORKER_AREA_FIELD.INTENT]: "toggle" }],
    [{ [WORKER_AREA_FIELD.WORKER_ID]: "" }],
    [{ [WORKER_AREA_FIELD.USERNAME]: "" }],
  ])(
    "changes nothing for the form %j",
    async (overrides) => {
      expect(
        await submitWorkerAreaChange(
          null,
          buildFormData(overrides)
        )
      ).toBe(WORKER_AREA_CHANGE_RESULT.FAILED);
      expect(
        changeWorkerAreaAsSignedIn
      ).not.toHaveBeenCalled();
    }
  );

  it.each([
    WORKER_AREA_CHANGE_RESULT.NOT_ALLOWED,
    WORKER_AREA_CHANGE_RESULT.BASE_AREA,
    WORKER_AREA_CHANGE_RESULT.EXTERNAL_GUIDE,
    WORKER_AREA_CHANGE_RESULT.NOT_FOUND,
    WORKER_AREA_CHANGE_RESULT.FAILED,
  ])(
    "answers the refusal %s to the form",
    async (result) => {
      vi.mocked(
        changeWorkerAreaAsSignedIn
      ).mockResolvedValue(result);

      expect(
        await submitWorkerAreaChange(null, buildFormData())
      ).toBe(result);
      expect(redirect).not.toHaveBeenCalled();
    }
  );
});
