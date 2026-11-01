import { BUTTON, SIZE } from "@/app/constants";
import {
  BUTTON_BASE_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_SIZE_CLASS,
  BUTTON_VARIANT_CLASS,
} from "@/app/components/button/styles/Button.styles";

export const CATEGORY_CARD_LINK_CLASS = `${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[BUTTON.SECONDARY]} ${BUTTON_SIZE_CLASS[SIZE.FULL]} ${BUTTON_ENABLED_CLASS} min-h-11 rounded-md md:w-auto md:flex-1 md:basis-36`;
