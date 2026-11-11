import {
  STRING,
  USERNAME,
  WORKER_REGISTRATION_ERROR_CODE,
  WORKER_USERNAME_PATTERN,
  type WorkerRegistrationErrorCode,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";

export const findWorkerUsernameError = (
  username: string
): NullableRef<WorkerRegistrationErrorCode> => {
  if (username === STRING.Empty) {
    return WORKER_REGISTRATION_ERROR_CODE.USERNAME_REQUIRED;
  }

  if (
    username.length < USERNAME.LENGTH.MIN ||
    username.length > USERNAME.LENGTH.MAX
  ) {
    return WORKER_REGISTRATION_ERROR_CODE.USERNAME_LENGTH;
  }

  return WORKER_USERNAME_PATTERN.test(username)
    ? null
    : WORKER_REGISTRATION_ERROR_CODE.USERNAME_FORMAT;
};
