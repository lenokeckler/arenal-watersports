import {
  BUTTON_BASE_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_SIZE_CLASS,
  BUTTON_VARIANT_CLASS,
} from "@/app/components/button/styles/Button.styles";
import { BUTTON, SIZE } from "@/app/constants";

export const EXTRA_CARD_ACTIONS_ROW_CLASS =
  "grid grid-cols-2 gap-3 md:flex md:shrink-0";

const EXTRA_CARD_ACTION_SIZE_CLASS =
  "min-h-11 rounded-md md:w-40";

export const EXTRA_CARD_EDIT_LINK_CLASS = `${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[BUTTON.SECONDARY]} ${BUTTON_SIZE_CLASS[SIZE.FULL]} ${BUTTON_ENABLED_CLASS} ${EXTRA_CARD_ACTION_SIZE_CLASS}`;

const EXTRA_CARD_ACTION_SHAPE_CLASS = `inline-flex w-full items-center justify-center border px-4 text-body-base transition-colors ${EXTRA_CARD_ACTION_SIZE_CLASS}`;

export const EXTRA_CARD_REACTIVATE_BUTTON_CLASS = `${EXTRA_CARD_ACTION_SHAPE_CLASS} border-outline-variant text-on-surface hover:bg-surface-container-high`;

export const EXTRA_CARD_REMOVE_BUTTON_CLASS = `${EXTRA_CARD_ACTION_SHAPE_CLASS} border-error text-error hover:bg-error-container/30`;

export const EXTRA_CARD_CONFIRM_CLASS =
  "flex w-full flex-col gap-3 md:w-96 md:shrink-0";

export const EXTRA_CARD_CONFIRM_MESSAGE_CLASS =
  "text-body-base text-on-surface";

export const EXTRA_CARD_CONFIRM_BUTTON_ROW_CLASS =
  "grid grid-cols-2 gap-3";

export const EXTRA_CARD_CONFIRM_BUTTON_CLASS = "min-h-11";
