import type { Nullable } from "@/app/types";

export const FIELD_FACTORY_TEXTAREA_CLASS =
  "resize-none h-[200px]";

export const FIELD_FACTORY_PLACEHOLDER_TEXT_CLASS =
  "text-placeholder";

export const FIELD_FACTORY_VALUE_TEXT_CLASS =
  "text-on-surface";

export const FIELD_FACTORY_SELECT_SIZE_CLASS =
  "h-[54px] sm:h-[58px]";

export const FIELD_FACTORY_PLACEHOLDER_OPTION_CLASS =
  FIELD_FACTORY_PLACEHOLDER_TEXT_CLASS;

export const FIELD_FACTORY_OPTION_CLASS =
  FIELD_FACTORY_VALUE_TEXT_CLASS;

export const FIELD_FACTORY_CHECKBOX_WRAPPER_CLASS =
  "flex items-start gap-2";

export const FIELD_FACTORY_CHECKBOX_INPUT_CLASS = "mt-1";

export const FIELD_FACTORY_CHECKBOX_LABEL_CLASS =
  "text-base font-medium";

export const FIELD_FACTORY_PASSWORD_WRAPPER_CLASS =
  "relative w-full";

export const FIELD_FACTORY_PASSWORD_TOGGLE_CLASS =
  "absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer";

export const FIELD_FACTORY_PASSWORD_ICON_CLASS =
  "cursor-pointer";

export const resolveFieldFactoryTextareaClassName = (
  baseClassName: string
): string =>
  `${baseClassName} ${FIELD_FACTORY_TEXTAREA_CLASS}`;

export const resolveFieldFactorySelectClassName = (
  baseClassName: string,
  isEmpty: boolean,
  selectSizeClassName: Nullable<string>
): string =>
  `${baseClassName} ${
    isEmpty
      ? FIELD_FACTORY_PLACEHOLDER_TEXT_CLASS
      : FIELD_FACTORY_VALUE_TEXT_CLASS
  } ${selectSizeClassName || FIELD_FACTORY_SELECT_SIZE_CLASS}`;
