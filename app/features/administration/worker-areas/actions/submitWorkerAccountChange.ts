"use server";

import { redirect } from "next/navigation";
import {
  WORKER_ACCOUNT_FIELD,
  WORKER_ACCOUNT_RESULT,
  WORKER_AREA_FIELD,
} from "@/app/constants";
import { changeWorkerAccountAsSignedIn } from "@/app/services/worker-areas";
import { readTextField } from "@/app/utils/form-data/readTextField";
import { buildWorkerAccountChangedPath } from "@/app/utils/worker-areas/buildWorkerAccountChangedPath";
import { isWorkerAccountAction } from "@/app/utils/worker-areas/isWorkerAccountAction";
import { WORKER_ACCOUNT_SUCCESSES } from "../constants/WorkerAccountSuccess.constants";
import type { WorkerAccountChangeServerAction } from "../models/WorkerAccountChangeServerAction.type";

export const submitWorkerAccountChange: WorkerAccountChangeServerAction =
  async (_previousState, formData) => {
    const action = readTextField(
      formData,
      WORKER_ACCOUNT_FIELD.ACTION
    );
    const username = readTextField(
      formData,
      WORKER_AREA_FIELD.USERNAME
    );
    const workerId = readTextField(
      formData,
      WORKER_AREA_FIELD.WORKER_ID
    );

    if (
      !isWorkerAccountAction(action) ||
      !workerId ||
      !username
    ) {
      return WORKER_ACCOUNT_RESULT.FAILED;
    }

    const result = await changeWorkerAccountAsSignedIn({
      action,
      workerId,
    });

    if (WORKER_ACCOUNT_SUCCESSES.includes(result)) {
      redirect(
        buildWorkerAccountChangedPath(username, result)
      );
    }

    return result;
  };
