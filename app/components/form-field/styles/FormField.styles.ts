import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

type FormFieldInputClassNameOptions = {
  classNameField: string;
  hasError: boolean;
  isPlaceholderValue: boolean;
  isInteractive: boolean;
  readOnly: boolean;
  disabled: boolean;
};

export const FORM_FIELD_WRAPPER_CLASS = "w-full";

export const FORM_FIELD_ERROR_TEXT_CLASS =
  "text-error text-sm mb-2";

export const FORM_FIELD_LABEL_CLASS =
  "block mb-1 font-bold text-sm md:text-base text-on-surface";

export const FORM_FIELD_LABEL_SUFFIX_CLASS =
  "font-bold text-on-surface";

export const FORM_FIELD_INPUT_BASE_CLASS =
  "bg-surface-container-highest placeholder:text-placeholder rounded-2xl w-full p-4 text-sm md:text-base border";

export const FORM_FIELD_INPUT_ERROR_CLASS =
  "border-error text-error";

export const FORM_FIELD_INPUT_VALID_CLASS =
  "border-outline";

export const FORM_FIELD_INPUT_PLACEHOLDER_TEXT_CLASS =
  "text-placeholder";

export const FORM_FIELD_INPUT_VALUE_TEXT_CLASS =
  "text-on-surface";

export const FORM_FIELD_INPUT_INTERACTIVE_CLASS =
  "transition-all duration-200 hover:ring-2 hover:ring-primary focus:ring-2 focus:ring-primary";

export const FORM_FIELD_INPUT_STATIC_CLASS =
  "transition-none hover:none focus:none pointer-events-none";

export const FORM_FIELD_INPUT_ERROR_INTERACTIVE_CLASS =
  "hover:ring-2 hover:ring-error focus:ring-2 focus:ring-error";

export const FORM_FIELD_INPUT_LOCKED_CLASS =
  "bg-surface-container-high";

export const FORM_FIELD_INPUT_READ_ONLY_CLASS = `${FORM_FIELD_INPUT_LOCKED_CLASS} cursor-default`;

export const FORM_FIELD_INPUT_DISABLED_CLASS = `${FORM_FIELD_INPUT_LOCKED_CLASS} cursor-not-allowed opacity-50`;

const resolveFormFieldInputStateClassName = (
  hasError: boolean,
  isPlaceholderValue: boolean
): string =>
  hasError
    ? FORM_FIELD_INPUT_ERROR_CLASS
    : joinClassNames(
        FORM_FIELD_INPUT_VALID_CLASS,
        isPlaceholderValue
          ? FORM_FIELD_INPUT_PLACEHOLDER_TEXT_CLASS
          : FORM_FIELD_INPUT_VALUE_TEXT_CLASS
      );

export const resolveFormFieldInputClassName = ({
  classNameField,
  hasError,
  isPlaceholderValue,
  isInteractive,
  readOnly,
  disabled,
}: FormFieldInputClassNameOptions): string =>
  joinClassNames(
    classNameField,
    FORM_FIELD_INPUT_BASE_CLASS,
    resolveFormFieldInputStateClassName(
      hasError,
      isPlaceholderValue
    ),
    isInteractive
      ? FORM_FIELD_INPUT_INTERACTIVE_CLASS
      : FORM_FIELD_INPUT_STATIC_CLASS,
    hasError &&
      isInteractive &&
      FORM_FIELD_INPUT_ERROR_INTERACTIVE_CLASS,
    readOnly && FORM_FIELD_INPUT_READ_ONLY_CLASS,
    disabled && FORM_FIELD_INPUT_DISABLED_CLASS
  );
