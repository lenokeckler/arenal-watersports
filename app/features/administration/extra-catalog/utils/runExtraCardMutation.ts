import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { RunExtraCardMutationOptions } from "../models/RunExtraCardMutationOptions.interface";
import { addPendingExtraId } from "./addPendingExtraId";
import { removePendingExtraId } from "./removePendingExtraId";

export const runExtraCardMutation = async ({
  extraId,
  genericErrorMessage,
  mutate,
  onSettled,
  setPendingExtraId,
  showToast,
}: RunExtraCardMutationOptions): Promise<void> => {
  setPendingExtraId(addPendingExtraId(extraId));

  try {
    const result = await mutate(extraId);
    const toastStatus =
      result.status === EXTRA_MUTATION_STATUS.ERROR
        ? STATUS.ERROR
        : STATUS.SUCCESS;
    showToast(toastStatus, result.message);
  } catch (error) {
    unstable_rethrow(error);
    showToast(STATUS.ERROR, genericErrorMessage);
  } finally {
    setPendingExtraId(removePendingExtraId(extraId));
    onSettled();
  }
};
