import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import {
  BOARD_CARD_CLASS,
  BOARD_CARD_MEDIA_ASPECT_CLASS,
} from "./BoardCard.styles";

export const EQUIPMENT_BOARD_EMPTY_CLASS =
  "flex flex-col items-center gap-sm rounded-xl border border-dashed border-outline-variant p-lg text-center";

export const EQUIPMENT_BOARD_EMPTY_ICON_CLASS =
  "text-4xl text-on-surface-variant";

export const EQUIPMENT_BOARD_STATE_TITLE_CLASS =
  "text-title-md text-on-surface";

export const EQUIPMENT_BOARD_STATE_BODY_CLASS =
  "text-body-base text-on-surface-variant";

export const EQUIPMENT_BOARD_ERROR_CLASS =
  "flex items-start gap-sm rounded-xl bg-error-container p-md text-on-error-container";

export const EQUIPMENT_BOARD_ERROR_ICON_CLASS =
  "shrink-0 text-2xl";

export const EQUIPMENT_BOARD_ERROR_TEXT_CLASS =
  "flex flex-col gap-xs";

export const EQUIPMENT_BOARD_ERROR_TITLE_CLASS =
  "text-title-md text-on-error-container";

export const EQUIPMENT_BOARD_ERROR_BODY_CLASS =
  "text-body-base text-on-error-container";

export const EQUIPMENT_BOARD_ERROR_BUTTON_CLASS =
  "mt-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const EQUIPMENT_BOARD_SKELETON_CARD_CLASS =
  joinClassNames(
    BOARD_CARD_CLASS,
    "animate-pulse motion-reduce:animate-none"
  );

export const EQUIPMENT_BOARD_SKELETON_BAR_CLASS =
  "rounded bg-surface-container-high";

export const EQUIPMENT_BOARD_SKELETON_MEDIA_CLASS =
  joinClassNames(
    BOARD_CARD_MEDIA_ASPECT_CLASS,
    "bg-surface-container-high"
  );

export const EQUIPMENT_BOARD_SKELETON_USAGE_CLASS =
  joinClassNames(
    EQUIPMENT_BOARD_SKELETON_BAR_CLASS,
    "h-4 w-1/2"
  );

export const EQUIPMENT_BOARD_SKELETON_TRACK_CLASS =
  joinClassNames(
    EQUIPMENT_BOARD_SKELETON_BAR_CLASS,
    "h-2 w-full rounded-full"
  );
