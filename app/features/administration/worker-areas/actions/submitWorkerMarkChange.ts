"use server";

import { redirect } from "next/navigation";
import {
  WORKER_AREA_FIELD,
  WORKER_MARK_CHANGE_RESULT,
  WORKER_MARK_FIELD,
} from "@/app/constants";
import { changeWorkerMarkAsSignedIn } from "@/app/services/worker-areas";
import { readTextField } from "@/app/utils/form-data/readTextField";
import { buildWorkerMarkChangedPath } from "@/app/utils/worker-areas/buildWorkerMarkChangedPath";
import { isGrantableWorkerMark } from "@/app/utils/worker-areas/isGrantableWorkerMark";
import { isWorkerAreaIntent } from "@/app/utils/worker-areas/isWorkerAreaIntent";
import { WORKER_MARK_CHANGE_SUCCESSES } from "../constants/WorkerMarkChangeSuccess.constants";
import type { WorkerMarkChangeServerAction } from "../models/WorkerMarkChangeServerAction.type";

export const submitWorkerMarkChange: WorkerMarkChangeServerAction =
  async (_previousState, formData) => {
    const mark = readTextField(
      formData,
      WORKER_MARK_FIELD.MARK
    );
    const intent = readTextField(
      formData,
      WORKER_AREA_FIELD.INTENT
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
      !isGrantableWorkerMark(mark) ||
      !isWorkerAreaIntent(intent) ||
      !workerId ||
      !username
    ) {
      return WORKER_MARK_CHANGE_RESULT.FAILED;
    }

    const result = await changeWorkerMarkAsSignedIn({
      intent,
      mark,
      workerId,
    });

    if (WORKER_MARK_CHANGE_SUCCESSES.includes(result)) {
      redirect(
        buildWorkerMarkChangedPath(username, intent, mark)
      );
    }

    return result;
  };
