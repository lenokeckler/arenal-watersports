import { STATUS } from "@/app/constants";
import type { CategoryImageSaveOutcome } from "../models/CategoryImageSaveOutcome.interface";

export const buildCategoryImageFailure = (
  message: string
): CategoryImageSaveOutcome => ({
  hasLeftoverObject: false,
  message,
  status: STATUS.ERROR,
});

export const buildCategoryImageCompletion = (
  message: string,
  hasLeftoverObject: boolean
): CategoryImageSaveOutcome => ({
  hasLeftoverObject,
  message,
  status: STATUS.SUCCESS,
});
