import {
  STRING,
  WORKER_FULL_NAME_LENGTH,
  WORKER_REGISTRATION_ERROR_CODE,
  type WorkerRegistrationErrorCode,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";

export const findWorkerFullNameError = (
  fullName: string
): NullableRef<WorkerRegistrationErrorCode> => {
  if (fullName === STRING.Empty) {
    return WORKER_REGISTRATION_ERROR_CODE.FULL_NAME_REQUIRED;
  }

  return fullName.length > WORKER_FULL_NAME_LENGTH.MAX
    ? WORKER_REGISTRATION_ERROR_CODE.FULL_NAME_LENGTH
    : null;
};
