import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import { FORM_SUBMIT_BUTTON_TONE } from "../constants/FormSubmitButtonTone.constants";
import type { FormSubmitButtonTone } from "../models/FormSubmitButtonTone.type";

export const FORM_SUBMIT_CLASS =
  "mt-sm inline-flex min-h-14 w-full items-center justify-center gap-sm rounded-lg bg-primary px-md py-sm text-button font-semibold uppercase tracking-widest text-on-primary shadow-md transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:active:scale-100";

export const FORM_SUBMIT_INTERACTIVE_CLASS =
  "hover:brightness-110 active:scale-98";

export const FORM_SUBMIT_DANGER_OUTLINE_CLASS =
  "inline-flex min-h-14 w-full items-center justify-center gap-sm rounded-lg border border-error text-button font-semibold uppercase tracking-widest text-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error motion-reduce:transition-none";

export const FORM_SUBMIT_DANGER_OUTLINE_INTERACTIVE_CLASS =
  "active:bg-error/10";

export const FORM_SUBMIT_PENDING_CLASS = "opacity-70";

export const FORM_SUBMIT_ICON_CLASS = "text-lg";

export const FORM_SUBMIT_ICON_SPIN_CLASS =
  "animate-spin motion-reduce:animate-none";

const FORM_SUBMIT_TONE_CLASS: Record<
  FormSubmitButtonTone,
  string
> = {
  [FORM_SUBMIT_BUTTON_TONE.PRIMARY]: FORM_SUBMIT_CLASS,
  [FORM_SUBMIT_BUTTON_TONE.DANGER_OUTLINE]:
    FORM_SUBMIT_DANGER_OUTLINE_CLASS,
};

const FORM_SUBMIT_TONE_INTERACTIVE_CLASS: Record<
  FormSubmitButtonTone,
  string
> = {
  [FORM_SUBMIT_BUTTON_TONE.PRIMARY]:
    FORM_SUBMIT_INTERACTIVE_CLASS,
  [FORM_SUBMIT_BUTTON_TONE.DANGER_OUTLINE]:
    FORM_SUBMIT_DANGER_OUTLINE_INTERACTIVE_CLASS,
};

export const resolveFormSubmitClassName = (
  isPending: boolean,
  tone: FormSubmitButtonTone = FORM_SUBMIT_BUTTON_TONE.PRIMARY
): string =>
  joinClassNames(
    FORM_SUBMIT_TONE_CLASS[tone],
    isPending
      ? FORM_SUBMIT_PENDING_CLASS
      : FORM_SUBMIT_TONE_INTERACTIVE_CLASS[tone]
  );

export const resolveFormSubmitIconClassName = (
  isPending: boolean
): string =>
  joinClassNames(
    FORM_SUBMIT_ICON_CLASS,
    isPending && FORM_SUBMIT_ICON_SPIN_CLASS
  );
