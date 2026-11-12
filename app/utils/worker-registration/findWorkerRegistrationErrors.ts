import {
  WORKER_REGISTRATION_ERROR_CODE,
  WORKER_REGISTRATION_FIELD,
  type WorkerRegistrationErrorCode,
  type WorkerRegistrationField,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { findWorkerFullNameError } from "./findWorkerFullNameError";
import { findWorkerUsernameError } from "./findWorkerUsernameError";
import { isAssignableBaseRole } from "./isAssignableBaseRole";
import type { WorkerRegistrationFieldErrors } from "./models/WorkerRegistrationFieldErrors.type";
import type { WorkerRegistrationInput } from "./models/WorkerRegistrationInput.interface";

const findBaseRoleError = (
  baseRole: string
): NullableRef<WorkerRegistrationErrorCode> =>
  isAssignableBaseRole(baseRole)
    ? null
    : WORKER_REGISTRATION_ERROR_CODE.BASE_ROLE_REQUIRED;

export const findWorkerRegistrationErrors = ({
  baseRole,
  fullName,
  username,
}: WorkerRegistrationInput): WorkerRegistrationFieldErrors => {
  const checks: ReadonlyArray<
    readonly [
      WorkerRegistrationField,
      NullableRef<WorkerRegistrationErrorCode>,
    ]
  > = [
    [
      WORKER_REGISTRATION_FIELD.FULL_NAME,
      findWorkerFullNameError(fullName),
    ],
    [
      WORKER_REGISTRATION_FIELD.USERNAME,
      findWorkerUsernameError(username),
    ],
    [
      WORKER_REGISTRATION_FIELD.BASE_ROLE,
      findBaseRoleError(baseRole),
    ],
  ];

  return checks.reduce<WorkerRegistrationFieldErrors>(
    (fieldErrors, [field, errorCode]) =>
      errorCode
        ? { ...fieldErrors, [field]: errorCode }
        : fieldErrors,
    {}
  );
};
