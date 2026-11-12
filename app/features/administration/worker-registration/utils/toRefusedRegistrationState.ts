import {
  WORKER_REGISTRATION_FIELD,
  type WorkerRegistrationErrorCode,
} from "@/app/constants";
import { WORKER_REGISTRATION_REFUSAL_FIELD } from "../constants/WorkerRegistrationRefusalField.constants";
import { WORKER_REGISTRATION_STATUS } from "../constants/WorkerRegistrationStatus.constants";
import type { WorkerRegistrationState } from "../models/WorkerRegistrationState.type";

export const toRefusedRegistrationState = (
  code: WorkerRegistrationErrorCode
): WorkerRegistrationState => ({
  status: WORKER_REGISTRATION_STATUS.INVALID,
  fieldErrors: {
    [WORKER_REGISTRATION_REFUSAL_FIELD[code] ??
    WORKER_REGISTRATION_FIELD.FORM]: code,
  },
});
