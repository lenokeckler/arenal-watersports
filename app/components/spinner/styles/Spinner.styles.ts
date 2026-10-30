import { SPINNER_SIZE } from "../constants/Spinner.constants";
import type { SpinnerSize } from "../models/SpinnerProps.interface";

export const SPINNER_CONTAINER_CLASS =
  "flex justify-center items-center";

export const SPINNER_FULL_SCREEN_CONTAINER_CLASS = `fixed inset-0 w-full h-full bg-surface/80 z-50 ${SPINNER_CONTAINER_CLASS}`;

export const SPINNER_CENTERED_IN_FORM_CONTAINER_CLASS = `fixed inset-0 w-full h-full bg-surface ${SPINNER_CONTAINER_CLASS}`;

export const SPINNER_SIZE_CLASS: Record<
  SpinnerSize,
  string
> = {
  [SPINNER_SIZE.SMALL]: "w-6 h-6",
  [SPINNER_SIZE.MEDIUM]: "w-8 h-8",
  [SPINNER_SIZE.LARGE]: "w-12 h-12",
};

export const SPINNER_WHEEL_CLASS =
  "animate-spin rounded-full border-4 border-t-transparent border-primary";

export const resolveSpinnerContainerClassName = (
  fullScreen: boolean,
  centeredInForm: boolean
): string => {
  if (fullScreen) {
    return SPINNER_FULL_SCREEN_CONTAINER_CLASS;
  }
  if (centeredInForm) {
    return SPINNER_CENTERED_IN_FORM_CONTAINER_CLASS;
  }
  return SPINNER_CONTAINER_CLASS;
};

export const resolveSpinnerWheelClassName = (
  size: SpinnerSize
): string =>
  `${SPINNER_SIZE_CLASS[size]} ${SPINNER_WHEEL_CLASS}`;
