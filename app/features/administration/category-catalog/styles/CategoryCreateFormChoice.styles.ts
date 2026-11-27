import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const CATEGORY_CREATE_FORM_CHOICE_GROUP_CLASS =
  "flex flex-col gap-2";

export const CATEGORY_CREATE_FORM_CHOICE_LABEL_TEXT_CLASS =
  "text-sm font-semibold text-on-surface";

export const CATEGORY_CREATE_FORM_CHOICE_CARDS_CLASS =
  "grid grid-cols-1 gap-3 sm:grid-cols-2";

export const CATEGORY_CREATE_FORM_CHOICE_CARD_BASE_CLASS =
  "flex min-h-11 w-full flex-col items-start gap-1 rounded-2xl border-2 p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60";

export const CATEGORY_CREATE_FORM_CHOICE_CARD_SELECTED_CLASS =
  "border-primary bg-primary/10";

export const CATEGORY_CREATE_FORM_CHOICE_CARD_IDLE_CLASS =
  "border-outline-variant bg-surface-container-high";

export const CATEGORY_CREATE_FORM_CHOICE_LABEL_CLASS =
  "text-base font-semibold text-on-surface";

export const CATEGORY_CREATE_FORM_CHOICE_HELP_CLASS =
  "text-sm font-normal text-on-surface-variant";

export const CATEGORY_CREATE_FORM_CHOICE_NOTE_CLASS =
  "text-sm text-on-surface-variant";

export const CATEGORY_CREATE_FORM_CHOICE_ERROR_CLASS =
  "text-sm text-error";

export const CATEGORY_CREATE_FORM_NAME_HELP_CLASS =
  "-mt-2 text-sm text-on-surface-variant";

export const resolveCategoryCreateFormChoiceCardClassName =
  (isSelected: boolean): string =>
    joinClassNames(
      CATEGORY_CREATE_FORM_CHOICE_CARD_BASE_CLASS,
      isSelected
        ? CATEGORY_CREATE_FORM_CHOICE_CARD_SELECTED_CLASS
        : CATEGORY_CREATE_FORM_CHOICE_CARD_IDLE_CLASS
    );
