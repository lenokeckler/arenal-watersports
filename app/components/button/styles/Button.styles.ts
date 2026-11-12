import { BUTTON } from "../constants/Button.types";
import { SIZE } from "../constants/Size.types";

export const BUTTON_TOUCH_TARGET_CLASS =
  "min-h-11 min-w-11";

export const BUTTON_BASE_CLASS = `${BUTTON_TOUCH_TARGET_CLASS} font-semibold transition-colors duration-200 focus:outline-none text-center inline-flex items-center justify-center w-auto max-w-full`;

export const BUTTON_PRIMARY_CLASS =
  "bg-primary text-on-primary border-3 border-primary hover:bg-primary-container hover:text-on-primary-container hover:border-primary-container";

export const BUTTON_SECONDARY_CLASS =
  "bg-surface border-3 border-outline text-primary hover:bg-surface-container-high";

export const BUTTON_DANGER_CLASS =
  "bg-error text-on-error border-3 border-error hover:bg-error-container hover:text-on-error-container hover:border-error-container";

export const BUTTON_UNSTYLED_CLASS = "";

export const BUTTON_DARK_GREEN_CLASS =
  "bg-primary text-on-primary border-3 border-primary hover:bg-primary-container hover:text-on-primary-container hover:border-primary-container";

export const BUTTON_ORANGE_CLASS =
  "bg-secondary text-on-secondary border-3 border-secondary hover:bg-secondary-container hover:text-on-secondary-container hover:border-secondary-container";

export const BUTTON_LIME_CLASS =
  "bg-primary-container text-on-primary-container border-3 border-primary-container hover:bg-primary hover:text-on-primary hover:border-primary";

export const BUTTON_BRAND_BLUE_CLASS =
  "bg-tertiary text-on-tertiary border-3 border-tertiary hover:bg-surface hover:text-tertiary transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-tertiary disabled:hover:text-on-tertiary";

export const BUTTON_CANCEL_VARIANT_CLASS =
  "bg-error text-on-error border border-error hover:bg-error-container hover:text-on-error-container";

export const BUTTON_VARIANT_CLASS: Record<BUTTON, string> =
  {
    [BUTTON.PRIMARY]: BUTTON_PRIMARY_CLASS,
    [BUTTON.SECONDARY]: BUTTON_SECONDARY_CLASS,
    [BUTTON.DANGER]: BUTTON_DANGER_CLASS,
    [BUTTON.BASE]: BUTTON_UNSTYLED_CLASS,
    [BUTTON.DARK_GREEN]: BUTTON_DARK_GREEN_CLASS,
    [BUTTON.ORANGE]: BUTTON_ORANGE_CLASS,
    [BUTTON.LIME]: BUTTON_LIME_CLASS,
    [BUTTON.CANCEL]: BUTTON_CANCEL_VARIANT_CLASS,
    [BUTTON.CONFIRM]: BUTTON_PRIMARY_CLASS,
    [BUTTON.CLOSE]: BUTTON_PRIMARY_CLASS,
    [BUTTON.BRAND_BLUE]: BUTTON_BRAND_BLUE_CLASS,
  };

export const BUTTON_SIZE_CLASS: Record<SIZE, string> = {
  [SIZE.SM]:
    "px-2 py-1 sm:px-2 sm:py-2 md:px-2 md:py-2 text-xs sm:text-sm md:text-base",
  [SIZE.MD]:
    "px-5 py-1 sm:px-4 sm:py-3 md:px-4 md:py-2 text-sm sm:text-base md:text-lg",
  [SIZE.LG]:
    "px-6 py-1 sm:px-5 sm:py-2.5 md:px-6 md:py-2 text-base sm:text-lg md:text-xl",
  [SIZE.XL]:
    "px-8 py-1 sm:px-6 sm:py-3 md:px-8 md:py-2 text-lg sm:text-xl md:text-2xl",
  [SIZE.XXL]:
    "px-10 py-1 sm:px-8 sm:py-4 md:px-10 md:py-3 text-xl sm:text-2xl md:text-3xl",
  [SIZE.NONE]: "",
  [SIZE.FULL]: "w-full",
};

export const BUTTON_DISABLED_CLASS = "cursor-default";

export const BUTTON_ENABLED_CLASS = "cursor-pointer";

export const BUTTON_MODAL_ACTION_CLASS =
  "mt-4 w-full p-3 text-sm sm:text-base rounded";

export const BUTTON_CANCEL_CLASS = `${BUTTON_MODAL_ACTION_CLASS} bg-error text-on-error border border-error hover:!bg-error-container hover:!text-on-error-container hover:border-error-container`;

export const BUTTON_CONFIRM_CLASS = `${BUTTON_MODAL_ACTION_CLASS} bg-primary text-on-primary border border-primary hover:!bg-primary-container hover:!text-on-primary-container hover:border-primary-container`;

export const BUTTON_CLOSE_CLASS = BUTTON_CONFIRM_CLASS;

export const resolveButtonColorClassName = (
  color: string
): string =>
  `bg-[${color}] text-on-primary hover:brightness-90`;

export const resolveButtonRadiusClassName = (
  radius: SIZE
): string => `rounded-${radius}`;
