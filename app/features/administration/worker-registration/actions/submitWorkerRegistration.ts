"use server";

import { registerWorkerAsSignedIn } from "@/app/services/worker-registration";
import { checkWorkerRegistration } from "@/app/utils/worker-registration/checkWorkerRegistration";
import { WORKER_REGISTRATION_STATUS } from "../constants/WorkerRegistrationStatus.constants";
import type { WorkerRegistrationServerAction } from "../models/WorkerRegistrationServerAction.type";
import { readWorkerRegistrationInput } from "../utils/readWorkerRegistrationInput";
import { toRefusedRegistrationState } from "../utils/toRefusedRegistrationState";

export const submitWorkerRegistration: WorkerRegistrationServerAction =
  async (_previousState, formData) => {
    const check = checkWorkerRegistration(
      readWorkerRegistrationInput(formData)
    );

    if (!check.ok) {
      return {
        status: WORKER_REGISTRATION_STATUS.INVALID,
        fieldErrors: check.fieldErrors,
      };
    }

    const result = await registerWorkerAsSignedIn(
      check.registration
    );

    if (!result.ok) {
      return toRefusedRegistrationState(result.code);
    }

    return {
      status: WORKER_REGISTRATION_STATUS.REGISTERED,
      registered: result.registered,
    };
  };
