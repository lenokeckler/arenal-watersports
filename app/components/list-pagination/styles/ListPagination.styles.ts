import { BUTTON, SIZE } from "@/app/constants";
import {
  BUTTON_BASE_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_SIZE_CLASS,
  BUTTON_VARIANT_CLASS,
} from "@/app/components/button/styles/Button.styles";

export const LIST_PAGINATION_CLASS =
  "grid grid-cols-[1fr_auto_1fr] items-center gap-3";

const LIST_PAGINATION_LINK_CLASS = `${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[BUTTON.SECONDARY]} ${BUTTON_SIZE_CLASS[SIZE.MD]} ${BUTTON_ENABLED_CLASS} rounded-md min-h-11`;

export const LIST_PAGINATION_PREVIOUS_CLASS = `${LIST_PAGINATION_LINK_CLASS} col-start-1 justify-self-start`;

export const LIST_PAGINATION_NEXT_CLASS = `${LIST_PAGINATION_LINK_CLASS} col-start-3 justify-self-end`;

export const LIST_PAGINATION_STATUS_CLASS =
  "col-start-2 text-body-base text-on-surface-variant";
