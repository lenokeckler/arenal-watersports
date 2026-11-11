"use server";

import { redirect } from "next/navigation";
import {
  WORKER_AREA_CHANGE_RESULT,
  WORKER_AREA_FIELD,
} from "@/app/constants";
import { changeWorkerAreaAsSignedIn } from "@/app/services/worker-areas";
import { readTextField } from "@/app/utils/form-data/readTextField";
import { buildWorkerAreaChangedPath } from "@/app/utils/worker-areas/buildWorkerAreasPath";
import { isGrantableWorkerArea } from "@/app/utils/worker-areas/isGrantableWorkerArea";
import { isWorkerAreaIntent } from "@/app/utils/worker-areas/isWorkerAreaIntent";
import { WORKER_AREA_CHANGE_SUCCESSES } from "../constants/WorkerAreaChangeSuccess.constants";
import type { WorkerAreaChangeServerAction } from "../models/WorkerAreaChangeServerAction.type";

export const submitWorkerAreaChange: WorkerAreaChangeServerAction =
  async (_previousState, formData) => {
    const area = readTextField(
      formData,
      WORKER_AREA_FIELD.AREA
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
      !isGrantableWorkerArea(area) ||
      !isWorkerAreaIntent(intent) ||
      !workerId ||
      !username
    ) {
      return WORKER_AREA_CHANGE_RESULT.FAILED;
    }

    const result = await changeWorkerAreaAsSignedIn({
      area,
      intent,
      workerId,
    });

    if (WORKER_AREA_CHANGE_SUCCESSES.includes(result)) {
      redirect(
        buildWorkerAreaChangedPath(username, intent, area)
      );
    }

    return result;
  };
