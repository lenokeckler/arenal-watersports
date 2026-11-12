import { CATEGORY_IMAGE, STRING } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "./CategoryImageCopy.constants";
import {
  CATEGORY_IMAGE_FORM_STATE,
  type CategoryImageFormState,
} from "./CategoryImageFormState.constants";

export const CATEGORY_IMAGE_PICKER_ACCEPT =
  CATEGORY_IMAGE.MIME_TYPES.join(STRING.COMMA);

export const CATEGORY_IMAGE_PREVIEW_SIZES =
  "(min-width: 768px) 768px, 100vw";

export const CATEGORY_IMAGE_PREVIEW_ALT: Record<
  CategoryImageFormState,
  string
> = {
  [CATEGORY_IMAGE_FORM_STATE.EMPTY]:
    CATEGORY_IMAGE_COPY.PREVIEW_EMPTY,
  [CATEGORY_IMAGE_FORM_STATE.PICKED]:
    CATEGORY_IMAGE_COPY.PREVIEW_ALT_PICKED,
  [CATEGORY_IMAGE_FORM_STATE.SAVED]:
    CATEGORY_IMAGE_COPY.PREVIEW_ALT_SAVED,
};
