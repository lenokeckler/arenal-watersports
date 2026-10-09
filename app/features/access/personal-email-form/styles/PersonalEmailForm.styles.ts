import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const PERSONAL_EMAIL_FORM_CLASS =
  "flex flex-col gap-md";

export const PERSONAL_EMAIL_HEADING_BLOCK_CLASS =
  "flex flex-col gap-xs";

export const PERSONAL_EMAIL_GROUP_CLASS =
  "flex flex-col gap-xs";

export const PERSONAL_EMAIL_HINT_CLASS =
  "text-body-base text-on-surface-variant";

const PERSONAL_EMAIL_REMOVE_CLASS =
  "inline-flex min-h-14 w-full items-center justify-center gap-sm rounded-lg border border-error text-button font-semibold uppercase tracking-widest text-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error motion-reduce:transition-none";

const PERSONAL_EMAIL_REMOVE_INTERACTIVE_CLASS =
  "active:bg-error/10";

const PERSONAL_EMAIL_REMOVE_PENDING_CLASS = "opacity-70";

const PERSONAL_EMAIL_REMOVE_ICON_CLASS = "text-lg";

const PERSONAL_EMAIL_REMOVE_ICON_SPIN_CLASS =
  "animate-spin motion-reduce:animate-none";

export const resolvePersonalEmailRemoveClassName = (
  isPending: boolean
): string =>
  joinClassNames(
    PERSONAL_EMAIL_REMOVE_CLASS,
    isPending
      ? PERSONAL_EMAIL_REMOVE_PENDING_CLASS
      : PERSONAL_EMAIL_REMOVE_INTERACTIVE_CLASS
  );

export const resolvePersonalEmailRemoveIconClassName = (
  isShowingProgress: boolean
): string =>
  joinClassNames(
    PERSONAL_EMAIL_REMOVE_ICON_CLASS,
    isShowingProgress &&
      PERSONAL_EMAIL_REMOVE_ICON_SPIN_CLASS
  );
