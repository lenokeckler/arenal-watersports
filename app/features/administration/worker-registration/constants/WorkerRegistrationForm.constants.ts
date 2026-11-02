import {
  ASSIGNABLE_BASE_ROLES,
  STRING,
  WORKER_REGISTRATION_FIELD,
} from "@/app/constants";
import type { WorkerRegistrationInput } from "@/app/utils/worker-registration/models/WorkerRegistrationInput.interface";
import type { WorkerRegistrationState } from "../models/WorkerRegistrationState.type";
import { WORKER_BASE_ROLE_LABEL } from "./WorkerRegistrationCopy.constants";
import { WORKER_REGISTRATION_STATUS } from "./WorkerRegistrationStatus.constants";

export const WORKER_REGISTRATION_INITIAL_STATE: WorkerRegistrationState =
  { status: WORKER_REGISTRATION_STATUS.IDLE };

export const WORKER_REGISTRATION_EMPTY_VALUES: WorkerRegistrationInput =
  {
    baseRole: STRING.Empty,
    fullName: STRING.Empty,
    username: STRING.Empty,
  };

export const WORKER_REGISTRATION_FOCUS_ORDER = [
  WORKER_REGISTRATION_FIELD.FULL_NAME,
  WORKER_REGISTRATION_FIELD.USERNAME,
] as const;

export const WORKER_BASE_ROLE_OPTIONS =
  ASSIGNABLE_BASE_ROLES.map((baseRole) => ({
    key: baseRole,
    label: WORKER_BASE_ROLE_LABEL[baseRole],
    value: baseRole,
  }));

export const WORKER_REGISTRATION_HINT_ID = {
  BASE_ROLE: "worker-registration-base-role-hint",
  USERNAME: "worker-registration-username-hint",
} as const;
