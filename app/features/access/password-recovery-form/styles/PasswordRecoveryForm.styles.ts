import {
  FORM_FIELD_GLASS_INPUT_BASE_CLASS,
  FORM_FIELD_GLASS_INPUT_ERROR_CLASS,
  FORM_FIELD_GLASS_INPUT_VALID_CLASS,
} from "@/app/components/form-field/styles/FormField.styles";
import { FORM_TEXT_LINK_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import type { PasswordRecoveryPinBoxState } from "../models/PasswordRecoveryPinBoxState.interface";

export const PASSWORD_RECOVERY_PIN_INPUT_CLASS =
  "text-center font-mono tracking-widest";

export const PASSWORD_RECOVERY_ANOTHER_PIN_LINK_CLASS = `${FORM_TEXT_LINK_CLASS} self-start`;

export const PASSWORD_RECOVERY_PIN_FRAME_CLASS =
  "group relative";

const PASSWORD_RECOVERY_PIN_PLAIN_INPUT_CLASS = `${FORM_FIELD_GLASS_INPUT_BASE_CLASS} ${PASSWORD_RECOVERY_PIN_INPUT_CLASS}`;

export const PASSWORD_RECOVERY_PIN_BOXES_INPUT_CLASS =
  "absolute inset-0 z-10 h-full w-full cursor-text opacity-0";

export const resolvePasswordRecoveryPinInputClassName = (
  showsBoxes: boolean,
  hasError: boolean
): string =>
  showsBoxes
    ? PASSWORD_RECOVERY_PIN_BOXES_INPUT_CLASS
    : joinClassNames(
        PASSWORD_RECOVERY_PIN_PLAIN_INPUT_CLASS,
        hasError
          ? FORM_FIELD_GLASS_INPUT_ERROR_CLASS
          : FORM_FIELD_GLASS_INPUT_VALID_CLASS
      );

export const PASSWORD_RECOVERY_PIN_BOXES_CLASS =
  "grid grid-cols-6 gap-xs";

const PASSWORD_RECOVERY_PIN_BOX_CLASS =
  "flex min-h-14 items-center justify-center rounded-lg border bg-surface-container/50 font-mono text-title-md font-semibold text-on-surface transition-colors duration-200 motion-reduce:transition-none";

const PASSWORD_RECOVERY_PIN_BOX_EMPTY_CLASS =
  "border-outline";

const PASSWORD_RECOVERY_PIN_BOX_FILLED_CLASS =
  "border-primary/60";

const PASSWORD_RECOVERY_PIN_BOX_NEXT_CLASS =
  "group-focus-within:border-primary group-focus-within:ring-2 group-focus-within:ring-primary";

const PASSWORD_RECOVERY_PIN_BOX_ERROR_CLASS =
  "border-error";

export const resolvePasswordRecoveryPinBoxClassName = ({
  hasError,
  isFilled,
  isNext,
}: PasswordRecoveryPinBoxState): string =>
  joinClassNames(
    PASSWORD_RECOVERY_PIN_BOX_CLASS,
    hasError && PASSWORD_RECOVERY_PIN_BOX_ERROR_CLASS,
    !hasError &&
      (isFilled
        ? PASSWORD_RECOVERY_PIN_BOX_FILLED_CLASS
        : PASSWORD_RECOVERY_PIN_BOX_EMPTY_CLASS),
    isNext && PASSWORD_RECOVERY_PIN_BOX_NEXT_CLASS
  );

export const PASSWORD_RECOVERY_NOT_RECEIVED_CLASS =
  "flex flex-col items-start gap-xs";

export const PASSWORD_RECOVERY_NOT_RECEIVED_SUMMARY_CLASS =
  "flex min-h-12 cursor-pointer list-none items-center gap-xs rounded-lg text-body-base font-semibold text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden";

export const PASSWORD_RECOVERY_NOT_RECEIVED_ICON_CLASS =
  "text-primary transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none";

export const PASSWORD_RECOVERY_NOT_RECEIVED_DETAILS_CLASS =
  "group w-full";

export const PASSWORD_RECOVERY_NOT_RECEIVED_HELP_CLASS =
  "flex flex-col gap-xs pb-xs";

export const PASSWORD_RECOVERY_SENT_NOTICE_CLASS =
  "text-body-base text-on-surface-variant";
