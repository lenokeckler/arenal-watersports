"use server";

import {
  WORKER_ACCOUNT_RESULT,
  WORKER_AREA_FIELD,
} from "@/app/constants";
import { grantTemporaryPasswordAsSignedIn } from "@/app/services/authentication";
import { readTextField } from "@/app/utils/form-data/readTextField";
import type { WorkerTemporaryPasswordState } from "../models/WorkerTemporaryPasswordState.type";

export const submitWorkerTemporaryPassword = async (
  _previousState: WorkerTemporaryPasswordState,
  formData: FormData
): Promise<WorkerTemporaryPasswordState> => {
  const workerId = readTextField(
    formData,
    WORKER_AREA_FIELD.WORKER_ID
  );

  if (!workerId) {
    return {
      ok: false,
      result: WORKER_ACCOUNT_RESULT.FAILED,
    };
  }

  return await grantTemporaryPasswordAsSignedIn(workerId);
};
