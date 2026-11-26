import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const COMBO_FORM_CONTENT_CLASS =
  "mx-auto flex w-full max-w-3xl flex-col gap-gutter px-margin-mobile py-md md:px-margin-desktop md:py-lg";

export const COMBO_FORM_CARD_CLASS =
  "flex flex-col gap-gutter rounded-2xl border border-outline-variant bg-surface-container p-4 md:p-6";

export const COMBO_FORM_ACTIONS_CLASS =
  "mx-auto flex w-full max-w-96 flex-col gap-3 sm:flex-row sm:justify-center";

export const COMBO_FORM_ACTION_BUTTON_CLASS =
  "min-h-11 w-full min-w-0 sm:w-auto sm:min-w-40";

export const COMBO_FORM_GROUP_CLASS = "flex flex-col gap-2";

export const COMBO_FORM_GROUP_TITLE_CLASS =
  "text-title-md font-medium text-on-surface";

export const COMBO_AUDIENCE_OPTIONS_CLASS =
  "grid grid-cols-2 gap-3";

const COMBO_AUDIENCE_OPTION_BASE_CLASS =
  "min-h-14 w-full rounded-xl border px-4 text-body-base font-medium transition-colors";

const COMBO_AUDIENCE_OPTION_SELECTED_CLASS =
  "border-primary bg-primary text-on-primary";

const COMBO_AUDIENCE_OPTION_IDLE_CLASS =
  "border-outline-variant text-on-surface hover:bg-surface-container-high";

export const resolveComboAudienceOptionClassName = (
  isSelected: boolean
): string =>
  joinClassNames(
    COMBO_AUDIENCE_OPTION_BASE_CLASS,
    isSelected
      ? COMBO_AUDIENCE_OPTION_SELECTED_CLASS
      : COMBO_AUDIENCE_OPTION_IDLE_CLASS
  );

export const COMBO_AUDIENCE_LOCKED_CLASS =
  "text-body-base text-on-surface";

export const COMBO_ITEM_ROW_CLASS =
  "flex flex-col gap-3 rounded-xl border border-outline-variant p-3";

export const COMBO_ITEM_BUTTON_CLASS =
  "min-h-11 w-full sm:w-auto";

export const COMBO_ITEMS_ERROR_CLASS =
  "text-body-base text-error";
