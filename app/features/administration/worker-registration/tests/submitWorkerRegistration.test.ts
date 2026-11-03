import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  WORKER_REGISTRATION_ERROR_CODE,
  WORKER_REGISTRATION_FIELD,
} from "@/app/constants";
import { registerWorkerAsSignedIn } from "@/app/services/worker-registration";
import { submitWorkerRegistration } from "../actions/submitWorkerRegistration";
import { WORKER_REGISTRATION_STATUS } from "../constants/WorkerRegistrationStatus.constants";
import {
  ACTION_FIXTURE,
  buildRegistrationFormData,
} from "./WorkerRegistrationAction.constants";

vi.mock("@/app/services/worker-registration", () => ({
  registerWorkerAsSignedIn: vi.fn(),
}));

const IDLE_STATE = {
  status: WORKER_REGISTRATION_STATUS.IDLE,
} as const;

const REGISTRATION = {
  baseRole: ACTION_FIXTURE.BASE_ROLE,
  fullName: ACTION_FIXTURE.FULL_NAME,
  username: ACTION_FIXTURE.USERNAME,
};

describe("submitWorkerRegistration", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("registers a valid worker and answers with the temporary password", async () => {
    const registered = {
      ...REGISTRATION,
      temporaryPassword: ACTION_FIXTURE.TEMPORARY_PASSWORD,
    };
    vi.mocked(registerWorkerAsSignedIn).mockResolvedValue({
      ok: true,
      registered,
    });

    expect(
      await submitWorkerRegistration(
        IDLE_STATE,
        buildRegistrationFormData()
      )
    ).toEqual({
      status: WORKER_REGISTRATION_STATUS.REGISTERED,
      registered,
    });
    expect(registerWorkerAsSignedIn).toHaveBeenCalledWith(
      REGISTRATION
    );
  });

  it("answers with the field errors and registers nobody", async () => {
    expect(
      await submitWorkerRegistration(
        IDLE_STATE,
        buildRegistrationFormData({
          [WORKER_REGISTRATION_FIELD.FULL_NAME]: "",
          [WORKER_REGISTRATION_FIELD.BASE_ROLE]: "",
        })
      )
    ).toEqual({
      status: WORKER_REGISTRATION_STATUS.INVALID,
      fieldErrors: {
        [WORKER_REGISTRATION_FIELD.BASE_ROLE]:
          WORKER_REGISTRATION_ERROR_CODE.BASE_ROLE_REQUIRED,
        [WORKER_REGISTRATION_FIELD.FULL_NAME]:
          WORKER_REGISTRATION_ERROR_CODE.FULL_NAME_REQUIRED,
      },
    });
    expect(registerWorkerAsSignedIn).not.toHaveBeenCalled();
  });

  it.each([
    [
      WORKER_REGISTRATION_ERROR_CODE.USERNAME_TAKEN,
      WORKER_REGISTRATION_FIELD.USERNAME,
    ],
    [
      WORKER_REGISTRATION_ERROR_CODE.NOT_ALLOWED,
      WORKER_REGISTRATION_FIELD.FORM,
    ],
    [
      WORKER_REGISTRATION_ERROR_CODE.FAILED,
      WORKER_REGISTRATION_FIELD.FORM,
    ],
  ])(
    "shows the refusal %s on the %s field",
    async (code, field) => {
      vi.mocked(registerWorkerAsSignedIn).mockResolvedValue(
        {
          ok: false,
          code,
        }
      );

      expect(
        await submitWorkerRegistration(
          IDLE_STATE,
          buildRegistrationFormData()
        )
      ).toEqual({
        status: WORKER_REGISTRATION_STATUS.INVALID,
        fieldErrors: { [field]: code },
      });
    }
  );
});
