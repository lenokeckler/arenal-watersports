import { ButtonProps } from "../models/ButtonProps.interface";
import { BUTTON, SIZE } from "../constants";
import {
  BUTTON_BASE_CLASS,
  BUTTON_CANCEL_CLASS,
  BUTTON_CLOSE_CLASS,
  BUTTON_CONFIRM_CLASS,
  BUTTON_DISABLED_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_SIZE_CLASS,
  BUTTON_VARIANT_CLASS,
  resolveButtonColorClassName,
  resolveButtonRadiusClassName,
} from "../styles/Button.styles";
import { STRING } from "@/app/constants";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const getButtonClassName = ({
  variant = BUTTON.PRIMARY,
  size = SIZE.MD,
  radius = SIZE.MD,
  disabled = false,
  color,
  className = STRING.Empty,
  isLoading = false,
}: ButtonProps): string => {
  const isDisabled = disabled || isLoading;
  const buttonStyle =
    BUTTON_VARIANT_CLASS[variant] ||
    BUTTON_VARIANT_CLASS[BUTTON.PRIMARY];
  const buttonSize =
    BUTTON_SIZE_CLASS[size] || BUTTON_SIZE_CLASS[SIZE.SM];
  const variantClass =
    variant !== BUTTON.BASE && !color
      ? buttonStyle
      : STRING.Empty;
  const colorClass = color
    ? resolveButtonColorClassName(color)
    : STRING.Empty;
  const sizeClass =
    variant !== BUTTON.BASE ? buttonSize : STRING.Empty;
  const radiusClass =
    variant !== BUTTON.BASE
      ? resolveButtonRadiusClassName(radius)
      : STRING.Empty;
  const stateClass = isDisabled
    ? BUTTON_DISABLED_CLASS
    : BUTTON_ENABLED_CLASS;
  if (variant === BUTTON.BASE) {
    return joinClassNames(className, stateClass);
  } else if (variant === BUTTON.CANCEL) {
    return joinClassNames(
      BUTTON_BASE_CLASS,
      BUTTON_CANCEL_CLASS,
      buttonSize,
      radiusClass,
      stateClass,
      className
    );
  } else if (variant === BUTTON.CONFIRM) {
    return joinClassNames(
      BUTTON_BASE_CLASS,
      BUTTON_CONFIRM_CLASS,
      buttonSize,
      radiusClass,
      stateClass,
      className
    );
  } else if (variant === BUTTON.CLOSE) {
    return joinClassNames(
      BUTTON_BASE_CLASS,
      BUTTON_CLOSE_CLASS,
      buttonSize,
      radiusClass,
      stateClass,
      className
    );
  }
  return joinClassNames(
    BUTTON_BASE_CLASS,
    colorClass || variantClass,
    sizeClass,
    radiusClass,
    stateClass,
    className
  );
};
