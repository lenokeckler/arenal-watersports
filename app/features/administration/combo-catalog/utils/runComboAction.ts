import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import type { ComboActionResult } from "../models/ComboActionResult.interface";
import type { RunComboActionOptions } from "../models/RunComboActionOptions.interface";

export const runComboAction = async ({
  action,
  comboId,
  genericErrorMessage,
}: RunComboActionOptions): Promise<ComboActionResult> => {
  try {
    return await action(comboId);
  } catch (error) {
    unstable_rethrow(error);
    return {
      message: genericErrorMessage,
      status: STATUS.ERROR,
    };
  }
};
