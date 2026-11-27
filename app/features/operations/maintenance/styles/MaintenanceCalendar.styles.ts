export const AGENDA_JOB_MARK_CLASS =
  "text-base! text-primary";

export const AGENDA_DAMAGE_MARK_CLASS =
  "text-base! text-error";

export const AGENDA_STATIC_ENTRY_CLASS =
  "flex min-h-12 items-start gap-3 rounded-xl border border-outline-variant/60 bg-surface-container/80 px-3 py-3";

export const AGENDA_ENTRY_CLASS = `${AGENDA_STATIC_ENTRY_CLASS} hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`;

export const AGENDA_ENTRY_BODY_CLASS =
  "flex min-w-0 flex-col";

export const AGENDA_ENTRY_TITLE_CLASS =
  "text-body-base font-semibold text-on-surface";

export const AGENDA_ENTRY_TEXT_CLASS =
  "text-body-base wrap-anywhere text-on-surface";

export const AGENDA_TOTALS_CLASS =
  "text-body-base font-semibold text-on-surface";

export const AGENDA_LINK_CLASS =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-outline-variant px-4 text-body-base font-semibold text-primary hover:bg-on-surface/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const AGENDA_EMPTY_CLASS =
  "text-body-sm text-on-surface-variant";

export const resolveAgendaTotalsClass = (
  isEmpty: boolean
): string =>
  isEmpty ? AGENDA_EMPTY_CLASS : AGENDA_TOTALS_CLASS;
