import type {
  WorkerRegistrationErrorCode,
  WorkerRegistrationField,
} from "@/app/constants";
import { WORKER_REGISTRATION_ERROR_COPY } from "../constants/WorkerRegistrationCopy.constants";
import { WORKER_REGISTRATION_STATUS } from "../constants/WorkerRegistrationStatus.constants";
import type { WorkerRegistrationFieldErrorCopy } from "../models/WorkerRegistrationFieldErrorCopy.type";
import type { WorkerRegistrationState } from "../models/WorkerRegistrationState.type";

export const resolveWorkerRegistrationErrorCopy = (
  state: WorkerRegistrationState,
  editedFields: readonly WorkerRegistrationField[]
): WorkerRegistrationFieldErrorCopy => {
  if (state.status !== WORKER_REGISTRATION_STATUS.INVALID) {
    return {};
  }

  const entries = Object.entries(
    state.fieldErrors
  ) as Array<
    [WorkerRegistrationField, WorkerRegistrationErrorCode]
  >;

  return entries.reduce<WorkerRegistrationFieldErrorCopy>(
    (copy, [field, code]) =>
      editedFields.includes(field)
        ? copy
        : {
            ...copy,
            [field]: WORKER_REGISTRATION_ERROR_COPY[code],
          },
    {}
  );
};
