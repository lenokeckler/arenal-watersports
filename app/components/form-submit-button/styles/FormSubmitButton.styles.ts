import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const FORM_SUBMIT_CLASS =
  "mt-sm inline-flex min-h-14 w-full items-center justify-center gap-sm rounded-lg bg-primary px-md py-sm text-button font-semibold uppercase tracking-widest text-on-primary shadow-md transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:active:scale-100";

export const FORM_SUBMIT_INTERACTIVE_CLASS =
  "hover:brightness-110 active:scale-98";

export const FORM_SUBMIT_PENDING_CLASS = "opacity-70";

export const FORM_SUBMIT_ICON_CLASS = "text-lg";

export const FORM_SUBMIT_ICON_SPIN_CLASS =
  "animate-spin motion-reduce:animate-none";

export const resolveFormSubmitClassName = (
  isPending: boolean
): string =>
  joinClassNames(
    FORM_SUBMIT_CLASS,
    isPending
      ? FORM_SUBMIT_PENDING_CLASS
      : FORM_SUBMIT_INTERACTIVE_CLASS
  );

export const resolveFormSubmitIconClassName = (
  isPending: boolean
): string =>
  joinClassNames(
    FORM_SUBMIT_ICON_CLASS,
    isPending && FORM_SUBMIT_ICON_SPIN_CLASS
  );
