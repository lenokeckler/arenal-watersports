import {
  CATEGORY_IMAGE_FORM_STATE,
  type CategoryImageFormState,
} from "../constants/CategoryImageFormState.constants";
import type { ResolveCategoryImageFormStateOptions } from "../models/ResolveCategoryImageFormStateOptions.interface";

export const resolveCategoryImageFormState = ({
  hasPickedFile,
  imageUrl,
}: ResolveCategoryImageFormStateOptions): CategoryImageFormState => {
  if (hasPickedFile) {
    return CATEGORY_IMAGE_FORM_STATE.PICKED;
  }

  return imageUrl
    ? CATEGORY_IMAGE_FORM_STATE.SAVED
    : CATEGORY_IMAGE_FORM_STATE.EMPTY;
};
