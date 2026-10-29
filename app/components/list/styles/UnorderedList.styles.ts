import type { CSSProperties } from "react";
import {
  UNORDERED_LIST,
  UnorderedListVariant,
} from "../UnorderedList.constants";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

type SpacingStep =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "10"
  | "12";

type UnorderedListVariantClassNames = {
  containerClass: string;
  listClass: string;
  itemClass: string;
};

export const UNORDERED_LIST_VALIDATION_CONTAINER_CLASS =
  "bg-error-container text-on-error-container p-3 rounded-md";

export const UNORDERED_LIST_BULLET_CLASS =
  "list-disc list-inside";

export const UNORDERED_LIST_VALIDATION_LIST_CLASS = `${UNORDERED_LIST_BULLET_CLASS} space-y-1 text-sm`;

export const UNORDERED_LIST_PLANS_LIST_CLASS =
  "list-none space-y-1";

export const UNORDERED_LIST_CHECKLIST_LIST_CLASS =
  "flex flex-col gap-xs list-none m-0 p-0";

export const UNORDERED_LIST_CHECKLIST_ITEM_CLASS =
  "flex items-start gap-sm text-sm";

export const UNORDERED_LIST_DEFAULT_LIST_CLASS = `${UNORDERED_LIST_BULLET_CLASS} space-y-2`;

export const UNORDERED_LIST_CENTERED_ITEM_CLASS =
  "text-on-surface text-center";

export const UNORDERED_LIST_CONTAINER_CLASS: Record<
  UnorderedListVariant,
  string
> = {
  [UNORDERED_LIST.VARIANTS.VALIDATION]:
    UNORDERED_LIST_VALIDATION_CONTAINER_CLASS,
  [UNORDERED_LIST.VARIANTS.DEFAULT]: "",
  [UNORDERED_LIST.VARIANTS.PLANS]: "",
  [UNORDERED_LIST.VARIANTS.SIDE_MENU]: "",
  [UNORDERED_LIST.VARIANTS.CHECKLIST]: "",
};

export const UNORDERED_LIST_LIST_CLASS: Record<
  UnorderedListVariant,
  string
> = {
  [UNORDERED_LIST.VARIANTS.VALIDATION]:
    UNORDERED_LIST_VALIDATION_LIST_CLASS,
  [UNORDERED_LIST.VARIANTS.DEFAULT]:
    UNORDERED_LIST_DEFAULT_LIST_CLASS,
  [UNORDERED_LIST.VARIANTS.PLANS]:
    UNORDERED_LIST_PLANS_LIST_CLASS,
  [UNORDERED_LIST.VARIANTS.SIDE_MENU]:
    UNORDERED_LIST_DEFAULT_LIST_CLASS,
  [UNORDERED_LIST.VARIANTS.CHECKLIST]:
    UNORDERED_LIST_CHECKLIST_LIST_CLASS,
};

export const UNORDERED_LIST_ITEM_CLASS: Record<
  UnorderedListVariant,
  string
> = {
  [UNORDERED_LIST.VARIANTS.VALIDATION]: "",
  [UNORDERED_LIST.VARIANTS.DEFAULT]: "",
  [UNORDERED_LIST.VARIANTS.PLANS]:
    UNORDERED_LIST_CENTERED_ITEM_CLASS,
  [UNORDERED_LIST.VARIANTS.SIDE_MENU]:
    UNORDERED_LIST_CENTERED_ITEM_CLASS,
  [UNORDERED_LIST.VARIANTS.CHECKLIST]:
    UNORDERED_LIST_CHECKLIST_ITEM_CLASS,
};

const UNORDERED_LIST_SPACING_STEP: Record<
  string,
  SpacingStep
> = {
  "0": "0",
  "4px": "1",
  "0.25rem": "1",
  "8px": "2",
  "0.5rem": "2",
  "12px": "3",
  "0.75rem": "3",
  "16px": "4",
  "1rem": "4",
  "20px": "5",
  "1.25rem": "5",
  "24px": "6",
  "1.5rem": "6",
  "32px": "8",
  "2rem": "8",
  "40px": "10",
  "2.5rem": "10",
  "48px": "12",
  "3rem": "12",
};

export const UNORDERED_LIST_MARGIN_CLASS: Record<
  SpacingStep,
  string
> = {
  "0": "m-0",
  "1": "m-1",
  "2": "m-2",
  "3": "m-3",
  "4": "m-4",
  "5": "m-5",
  "6": "m-6",
  "8": "m-8",
  "10": "m-10",
  "12": "m-12",
};

export const UNORDERED_LIST_MARGIN_TOP_CLASS: Record<
  SpacingStep,
  string
> = {
  "0": "mt-0",
  "1": "mt-1",
  "2": "mt-2",
  "3": "mt-3",
  "4": "mt-4",
  "5": "mt-5",
  "6": "mt-6",
  "8": "mt-8",
  "10": "mt-10",
  "12": "mt-12",
};

export const UNORDERED_LIST_MARGIN_BOTTOM_CLASS: Record<
  SpacingStep,
  string
> = {
  "0": "mb-0",
  "1": "mb-1",
  "2": "mb-2",
  "3": "mb-3",
  "4": "mb-4",
  "5": "mb-5",
  "6": "mb-6",
  "8": "mb-8",
  "10": "mb-10",
  "12": "mb-12",
};

export const UNORDERED_LIST_MARGIN_LEFT_CLASS: Record<
  SpacingStep,
  string
> = {
  "0": "ml-0",
  "1": "ml-1",
  "2": "ml-2",
  "3": "ml-3",
  "4": "ml-4",
  "5": "ml-5",
  "6": "ml-6",
  "8": "ml-8",
  "10": "ml-10",
  "12": "ml-12",
};

export const UNORDERED_LIST_MARGIN_RIGHT_CLASS: Record<
  SpacingStep,
  string
> = {
  "0": "mr-0",
  "1": "mr-1",
  "2": "mr-2",
  "3": "mr-3",
  "4": "mr-4",
  "5": "mr-5",
  "6": "mr-6",
  "8": "mr-8",
  "10": "mr-10",
  "12": "mr-12",
};

export const UNORDERED_LIST_PADDING_CLASS: Record<
  SpacingStep,
  string
> = {
  "0": "p-0",
  "1": "p-1",
  "2": "p-2",
  "3": "p-3",
  "4": "p-4",
  "5": "p-5",
  "6": "p-6",
  "8": "p-8",
  "10": "p-10",
  "12": "p-12",
};

export const UNORDERED_LIST_RADIUS_CLASS: Record<
  string,
  string
> = {
  "0": "rounded-none",
  "4px": "rounded",
  "0.25rem": "rounded",
  "8px": "rounded-lg",
  "0.5rem": "rounded-lg",
  "12px": "rounded-xl",
  "0.75rem": "rounded-xl",
  "16px": "rounded-2xl",
  "1rem": "rounded-2xl",
  "50%": "rounded-full",
};

export const UNORDERED_LIST_DISPLAY_CLASS: Record<
  string,
  string
> = {
  block: "block",
  inline: "inline",
  "inline-block": "inline-block",
  flex: "flex",
  grid: "grid",
  none: "hidden",
};

export const UNORDERED_LIST_TEXT_ALIGN_CLASS: Record<
  string,
  string
> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export const UNORDERED_LIST_FONT_WEIGHT_CLASS: Record<
  string,
  string
> = {
  normal: "font-normal",
  "400": "font-normal",
  bold: "font-bold",
  "700": "font-bold",
  "100": "font-thin",
  "200": "font-extralight",
  "300": "font-light",
  "500": "font-medium",
  "600": "font-semibold",
  "800": "font-extrabold",
  "900": "font-black",
};

const pickClassName = <Value extends string>(
  classNames: Record<string, Value>,
  key: string
): Value | undefined =>
  Object.prototype.hasOwnProperty.call(classNames, key)
    ? classNames[key]
    : undefined;

const resolveStringValue = (
  value: unknown
): string | undefined =>
  value && typeof value === "string" ? value : undefined;

const resolveSpacingClassName = (
  classNames: Record<SpacingStep, string>,
  value: unknown
): string | undefined => {
  const cssValue = resolveStringValue(value);
  if (cssValue === undefined) {
    return undefined;
  }
  const step = pickClassName(
    UNORDERED_LIST_SPACING_STEP,
    cssValue.trim()
  );
  return step === undefined ? undefined : classNames[step];
};

const resolveTrimmedClassName = (
  classNames: Record<string, string>,
  value: unknown
): string | undefined => {
  const cssValue = resolveStringValue(value);
  return cssValue === undefined
    ? undefined
    : pickClassName(classNames, cssValue.trim());
};

const resolveExactClassName = (
  classNames: Record<string, string>,
  value: unknown
): string | undefined => {
  const cssValue = resolveStringValue(value);
  return cssValue === undefined
    ? undefined
    : pickClassName(classNames, cssValue);
};

export const resolveUnorderedListStyleClassName = (
  style: CSSProperties = {}
): string =>
  joinClassNames(
    resolveSpacingClassName(
      UNORDERED_LIST_MARGIN_CLASS,
      style.margin
    ),
    resolveSpacingClassName(
      UNORDERED_LIST_MARGIN_TOP_CLASS,
      style.marginTop
    ),
    resolveSpacingClassName(
      UNORDERED_LIST_MARGIN_BOTTOM_CLASS,
      style.marginBottom
    ),
    resolveSpacingClassName(
      UNORDERED_LIST_MARGIN_LEFT_CLASS,
      style.marginLeft
    ),
    resolveSpacingClassName(
      UNORDERED_LIST_MARGIN_RIGHT_CLASS,
      style.marginRight
    ),
    resolveSpacingClassName(
      UNORDERED_LIST_PADDING_CLASS,
      style.padding
    ),
    resolveTrimmedClassName(
      UNORDERED_LIST_RADIUS_CLASS,
      style.borderRadius
    ),
    resolveExactClassName(
      UNORDERED_LIST_DISPLAY_CLASS,
      style.display
    ),
    resolveExactClassName(
      UNORDERED_LIST_TEXT_ALIGN_CLASS,
      style.textAlign
    ),
    resolveExactClassName(
      UNORDERED_LIST_FONT_WEIGHT_CLASS,
      style.fontWeight
    )
  );

export const resolveUnorderedListVariantStyles = (
  variant: UnorderedListVariant
): UnorderedListVariantClassNames => {
  const knownVariant = Object.prototype.hasOwnProperty.call(
    UNORDERED_LIST_LIST_CLASS,
    variant
  )
    ? variant
    : UNORDERED_LIST.VARIANTS.DEFAULT;
  return {
    containerClass:
      UNORDERED_LIST_CONTAINER_CLASS[knownVariant],
    listClass: UNORDERED_LIST_LIST_CLASS[knownVariant],
    itemClass: UNORDERED_LIST_ITEM_CLASS[knownVariant],
  };
};

export const resolveUnorderedListWrapperClassName = (
  className: string,
  styleClassName: string,
  containerClassName: string
): string =>
  joinClassNames(
    className,
    styleClassName,
    containerClassName
  );
