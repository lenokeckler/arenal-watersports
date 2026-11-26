import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const EXTRA_OCCUPANCY_SECTION_CLASS =
  "flex min-w-0 flex-col gap-3 border-0 p-0";

export const EXTRA_OCCUPANCY_LEGEND_CLASS =
  "mb-3 text-lg font-bold text-on-surface";

export const EXTRA_OCCUPANCY_CHOICES_CLASS =
  "grid grid-cols-2 gap-2";

const EXTRA_OCCUPANCY_CHOICE_CLASS =
  "flex min-h-19 cursor-pointer flex-col justify-center gap-0.5 rounded-2xl border-2 px-3.5 py-2 text-left transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary motion-reduce:transition-none";

const EXTRA_OCCUPANCY_CHOICE_SELECTED_CLASS =
  "border-primary bg-primary text-on-primary";

const EXTRA_OCCUPANCY_CHOICE_IDLE_CLASS =
  "border-outline text-on-surface hover:bg-surface-container-high";

const EXTRA_OCCUPANCY_CHOICE_DISABLED_CLASS =
  "cursor-not-allowed opacity-60";

export const resolveExtraOccupancyChoiceClassName = (
  isSelected: boolean,
  isDisabled: boolean
): string =>
  joinClassNames(
    EXTRA_OCCUPANCY_CHOICE_CLASS,
    isSelected
      ? EXTRA_OCCUPANCY_CHOICE_SELECTED_CLASS
      : EXTRA_OCCUPANCY_CHOICE_IDLE_CLASS,
    isDisabled && EXTRA_OCCUPANCY_CHOICE_DISABLED_CLASS
  );

export const EXTRA_OCCUPANCY_CHOICE_RADIO_CLASS = "sr-only";

const EXTRA_OCCUPANCY_CHOICE_TITLE_CLASS =
  "text-base font-bold";

const EXTRA_OCCUPANCY_CHOICE_HINT_CLASS = "text-sm";

const EXTRA_OCCUPANCY_CHOICE_ON_PRIMARY_CLASS =
  "text-on-primary";

const EXTRA_OCCUPANCY_CHOICE_TITLE_IDLE_CLASS =
  "text-on-surface";

const EXTRA_OCCUPANCY_CHOICE_HINT_IDLE_CLASS =
  "text-on-surface-variant";

export const resolveExtraOccupancyChoiceTitleClassName = (
  isSelected: boolean
): string =>
  joinClassNames(
    EXTRA_OCCUPANCY_CHOICE_TITLE_CLASS,
    isSelected
      ? EXTRA_OCCUPANCY_CHOICE_ON_PRIMARY_CLASS
      : EXTRA_OCCUPANCY_CHOICE_TITLE_IDLE_CLASS
  );

export const resolveExtraOccupancyChoiceHintClassName = (
  isSelected: boolean
): string =>
  joinClassNames(
    EXTRA_OCCUPANCY_CHOICE_HINT_CLASS,
    isSelected
      ? EXTRA_OCCUPANCY_CHOICE_ON_PRIMARY_CLASS
      : EXTRA_OCCUPANCY_CHOICE_HINT_IDLE_CLASS
  );

export const EXTRA_OCCUPANCY_FIELD_CLASS =
  "flex flex-col gap-1.5";

export const EXTRA_OCCUPANCY_STEPPER_CLASS =
  "flex items-end gap-1.5";

export const EXTRA_OCCUPANCY_QUANTITY_FIELD_CLASS =
  "min-w-0 flex-1";

export const EXTRA_OCCUPANCY_QUANTITY_INPUT_CLASS =
  "text-center text-xl font-bold";

export const EXTRA_OCCUPANCY_STEP_BUTTON_CLASS =
  "flex h-14 w-13 shrink-0 items-center justify-center rounded-xl border-2 border-outline bg-surface-container-high text-on-surface hover:border-primary focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50";

export const EXTRA_OCCUPANCY_NOTE_CLASS =
  "text-sm text-on-surface-variant";
