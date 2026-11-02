import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const SESSION_IDLE_WARNING_OVERLAY_CLASS =
  "fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-margin-mobile backdrop-blur-sm sm:items-center";

export const SESSION_IDLE_WARNING_PANEL_CLASS =
  "flex w-full max-w-form flex-col gap-md rounded-xl border border-outline-variant bg-surface-container p-md shadow-2xl md:p-lg";

export const SESSION_IDLE_WARNING_TITLE_CLASS =
  "text-title-md font-semibold text-on-surface";

export const SESSION_IDLE_WARNING_DESCRIPTION_CLASS =
  "text-body-base text-on-surface-variant";

export const SESSION_IDLE_WARNING_COUNTDOWN_CLASS =
  "mt-xs block font-mono text-headline-lg-mobile font-semibold tabular-nums text-primary";

export const SESSION_IDLE_WARNING_ACTIONS_CLASS =
  "flex flex-col gap-sm";

export const SESSION_IDLE_WARNING_KEEP_WORKING_CLASS =
  "inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-primary px-md py-sm text-button font-semibold uppercase tracking-widest text-on-primary shadow-md transition duration-200 hover:brightness-110 active:scale-98 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:active:scale-100";

const SESSION_IDLE_WARNING_SIGN_OUT_CLASS =
  "inline-flex min-h-14 w-full items-center justify-center rounded-lg border border-outline px-md py-sm text-button font-semibold uppercase tracking-widest text-on-surface transition-colors duration-200 hover:border-primary active:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

const SESSION_IDLE_WARNING_PENDING_CLASS = "opacity-70";

export const SESSION_IDLE_WARNING_ERROR_CLASS =
  "text-body-base text-error";

export const resolveSessionIdleSignOutClassName = (
  isPending: boolean
): string =>
  joinClassNames(
    SESSION_IDLE_WARNING_SIGN_OUT_CLASS,
    isPending && SESSION_IDLE_WARNING_PENDING_CLASS
  );
