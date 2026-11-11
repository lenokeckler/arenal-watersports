"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  PATHS,
  WORK_MODE_FIELD,
  WORK_MODE_RESULT,
  WORK_MODE_REVALIDATE_SCOPE,
} from "@/app/constants";
import { chooseWorkAreaAsSignedIn } from "@/app/services/work-mode";
import { readTextField } from "@/app/utils/form-data/readTextField";
import { isWorkArea } from "@/app/utils/work-mode/isWorkArea";
import type { WorkModeChoiceServerAction } from "../models/WorkModeChoiceServerAction.type";

export const submitWorkModeChoice: WorkModeChoiceServerAction =
  async (_previousState, formData) => {
    const area = readTextField(
      formData,
      WORK_MODE_FIELD.AREA
    );

    if (!isWorkArea(area)) {
      return WORK_MODE_RESULT.FAILED;
    }

    const result = await chooseWorkAreaAsSignedIn(area);

    if (result === WORK_MODE_RESULT.CHOSEN) {
      revalidatePath(
        PATHS.HOME,
        WORK_MODE_REVALIDATE_SCOPE
      );
      redirect(PATHS.HOME);
    }

    return result;
  };
