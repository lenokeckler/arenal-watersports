import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const CATEGORY_CONFIGURE_SWITCH_TRACK_BASE_CLASS =
  "relative inline-flex h-11 w-16 shrink-0 items-center rounded-full p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60";

export const CATEGORY_CONFIGURE_SWITCH_TRACK_ON_CLASS =
  "bg-primary-container";

export const CATEGORY_CONFIGURE_SWITCH_TRACK_OFF_CLASS =
  "bg-surface-container-highest";

export const CATEGORY_CONFIGURE_SWITCH_KNOB_BASE_CLASS =
  "h-8 w-8 rounded-full bg-on-primary-fixed transition-transform motion-reduce:transition-none";

export const CATEGORY_CONFIGURE_SWITCH_KNOB_ON_CLASS =
  "translate-x-5";

export const resolveCategoryConfigureSwitchTrackClassName =
  (isChecked: boolean): string =>
    joinClassNames(
      CATEGORY_CONFIGURE_SWITCH_TRACK_BASE_CLASS,
      isChecked
        ? CATEGORY_CONFIGURE_SWITCH_TRACK_ON_CLASS
        : CATEGORY_CONFIGURE_SWITCH_TRACK_OFF_CLASS
    );

export const resolveCategoryConfigureSwitchKnobClassName = (
  isChecked: boolean
): string =>
  joinClassNames(
    CATEGORY_CONFIGURE_SWITCH_KNOB_BASE_CLASS,
    isChecked && CATEGORY_CONFIGURE_SWITCH_KNOB_ON_CLASS
  );
