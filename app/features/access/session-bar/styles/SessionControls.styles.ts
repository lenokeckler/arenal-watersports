export const SESSION_CONTROLS_CLASS =
  "mt-2 flex flex-1 flex-col gap-3 border-t border-outline/60 pt-3";

export const SESSION_PREFERENCES_LABEL_CLASS =
  "text-body-sm uppercase tracking-wide text-on-surface-variant";

export const SESSION_THEME_GROUP_CLASS =
  "grid grid-cols-2 gap-2";

export const SESSION_THEME_OPTION_CLASS = {
  idle: "min-h-11 rounded-lg border border-outline px-3 text-body-md text-on-surface-variant hover:bg-surface-container-high",
  selected:
    "min-h-11 rounded-lg border-2 border-primary bg-primary/15 px-3 text-body-md font-semibold text-on-surface",
} as const;

export const SESSION_LOGOUT_SLOT_CLASS =
  "mt-auto flex flex-col gap-2 pt-4";
