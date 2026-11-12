"use server";

import { redirect } from "next/navigation";
import {
  WORKER_ACCOUNT_FIELD,
  WORKER_ACCOUNT_RESULT,
  WORKER_AREA_FIELD,
} from "@/app/constants";
import { extendWorkerExpiryAsSignedIn } from "@/app/services/worker-areas";
import { readTextField } from "@/app/utils/form-data/readTextField";
import { buildWorkerAccountChangedPath } from "@/app/utils/worker-areas/buildWorkerAccountChangedPath";
import type { WorkerAccountChangeServerAction } from "../models/WorkerAccountChangeServerAction.type";
import { buildWorkerExpiryTimestamp } from "../utils/buildWorkerExpiryTimestamp";

export const submitWorkerExpiryExtension: WorkerAccountChangeServerAction =
  async (_previousState, formData) => {
    const username = readTextField(
      formData,
      WORKER_AREA_FIELD.USERNAME
    );
    const workerId = readTextField(
      formData,
      WORKER_AREA_FIELD.WORKER_ID
    );
    const expiresOn = readTextField(
      formData,
      WORKER_ACCOUNT_FIELD.EXPIRES_ON
    );

    if (!workerId || !username) {
      return WORKER_ACCOUNT_RESULT.FAILED;
    }

    const expiresAt = buildWorkerExpiryTimestamp(expiresOn);

    if (expiresAt === null) {
      return WORKER_ACCOUNT_RESULT.INVALID_DATE;
    }

    const result = await extendWorkerExpiryAsSignedIn({
      expiresAt,
      workerId,
    });

    if (result === WORKER_ACCOUNT_RESULT.EXTENDED) {
      redirect(
        buildWorkerAccountChangedPath(username, result)
      );
    }

    return result;
  };
