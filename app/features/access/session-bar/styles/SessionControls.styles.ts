export const SESSION_CONTROLS_CLASS =
  "flex flex-1 flex-col gap-6";

export const SESSION_THEME_SECTION_CLASS =
  "flex flex-col gap-2.5";

export const SESSION_PREFERENCES_LABEL_CLASS =
  "px-3 text-sm font-bold uppercase tracking-wider text-on-surface-variant";

export const SESSION_THEME_GROUP_CLASS =
  "grid grid-cols-2 gap-2";

const SESSION_THEME_OPTION_BASE_CLASS =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 px-4 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

export const SESSION_THEME_OPTION_CLASS = {
  idle: `${SESSION_THEME_OPTION_BASE_CLASS} border-outline text-on-surface hover:bg-surface-container-high`,
  selected: `${SESSION_THEME_OPTION_BASE_CLASS} border-primary bg-primary text-on-primary`,
} as const;

export const SESSION_THEME_ICON_CLASS = "shrink-0 text-xl";

export const SESSION_LOGOUT_SLOT_CLASS =
  "mt-auto flex flex-col gap-2";
