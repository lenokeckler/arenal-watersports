import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const LOGIN_FORM_CLASS = "flex flex-col gap-md";

export const LOGIN_FORM_BANNER_CLASS =
  "flex items-start gap-sm rounded-lg border border-error/50 bg-error-container/80 p-sm";

export const LOGIN_FORM_BANNER_ICON_CLASS =
  "shrink-0 text-error";

export const LOGIN_FORM_BANNER_MESSAGE_CLASS =
  "flex-1 text-on-error-container";

export const LOGIN_FORM_SUBMIT_CLASS =
  "mt-sm inline-flex min-h-14 w-full items-center justify-center gap-sm rounded-lg bg-primary px-md py-sm text-button font-semibold uppercase tracking-widest text-on-primary shadow-md transition duration-200 hover:brightness-110 active:scale-98 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:active:scale-100";

export const LOGIN_FORM_SUBMIT_PENDING_CLASS = "opacity-70";

export const LOGIN_FORM_SUBMIT_ICON_CLASS = "text-lg";

export const LOGIN_FORM_SUBMIT_ICON_SPIN_CLASS =
  "animate-spin motion-reduce:animate-none";

export const resolveLoginFormSubmitClassName = (
  isPending: boolean
): string =>
  joinClassNames(
    LOGIN_FORM_SUBMIT_CLASS,
    isPending && LOGIN_FORM_SUBMIT_PENDING_CLASS
  );

export const resolveLoginFormSubmitIconClassName = (
  isPending: boolean
): string =>
  joinClassNames(
    LOGIN_FORM_SUBMIT_ICON_CLASS,
    isPending && LOGIN_FORM_SUBMIT_ICON_SPIN_CLASS
  );
