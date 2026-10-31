import { BUTTON, SIZE } from "@/app/constants";
import {
  BUTTON_BASE_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_SIZE_CLASS,
  BUTTON_VARIANT_CLASS,
} from "@/app/components/button/styles/Button.styles";

export const CATEGORY_LIST_HEADER_CLASS =
  "flex flex-col gap-gutter";

export const CATEGORY_LIST_HEADER_CREATE_LINK_CLASS = `${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[BUTTON.PRIMARY]} ${BUTTON_SIZE_CLASS[SIZE.MD]} ${BUTTON_ENABLED_CLASS} rounded-md min-h-11`;
