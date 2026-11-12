import type { ButtonProps } from "../models/ButtonProps.interface";
import { BUTTON, SIZE } from "../constants";
import {
  BUTTON_BASE_CLASS,
  BUTTON_CANCEL_CLASS,
  BUTTON_CLOSE_CLASS,
  BUTTON_CONFIRM_CLASS,
  BUTTON_DISABLED_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_SIZE_CLASS,
  BUTTON_TOUCH_TARGET_CLASS,
  BUTTON_VARIANT_CLASS,
  resolveButtonColorClassName,
  resolveButtonRadiusClassName,
} from "../styles/Button.styles";
import { STRING } from "@/app/constants";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

const BUTTON_ACTION_CLASS: Partial<Record<BUTTON, string>> =
  {
    [BUTTON.CANCEL]: BUTTON_CANCEL_CLASS,
    [BUTTON.CONFIRM]: BUTTON_CONFIRM_CLASS,
    [BUTTON.CLOSE]: BUTTON_CLOSE_CLASS,
  };

const resolveButtonStateClassName = ({
  disabled = false,
  isLoading = false,
}: ButtonProps): string =>
  disabled || isLoading
    ? BUTTON_DISABLED_CLASS
    : BUTTON_ENABLED_CLASS;

const buildBaseButtonClassName = (
  props: ButtonProps,
  stateClassName: string
): string =>
  joinClassNames(
    BUTTON_TOUCH_TARGET_CLASS,
    props.className ?? STRING.Empty,
    stateClassName
  );

const buildActionButtonClassName = (
  props: ButtonProps,
  actionClassName: string,
  stateClassName: string
): string => {
  const size = props.size ?? SIZE.MD;
  const radius = props.radius ?? SIZE.MD;

  return joinClassNames(
    BUTTON_BASE_CLASS,
    actionClassName,
    BUTTON_SIZE_CLASS[size] ?? BUTTON_SIZE_CLASS[SIZE.SM],
    resolveButtonRadiusClassName(radius),
    stateClassName,
    props.className ?? STRING.Empty
  );
};

const buildStandardButtonClassName = (
  props: ButtonProps,
  stateClassName: string
): string => {
  const variant = props.variant ?? BUTTON.PRIMARY;
  const size = props.size ?? SIZE.MD;
  const radius = props.radius ?? SIZE.MD;
  const colorClassName = props.color
    ? resolveButtonColorClassName(props.color)
    : STRING.Empty;
  const variantClassName =
    variant !== BUTTON.BASE && !props.color
      ? BUTTON_VARIANT_CLASS[variant] ||
        BUTTON_VARIANT_CLASS[BUTTON.PRIMARY]
      : STRING.Empty;

  return joinClassNames(
    BUTTON_BASE_CLASS,
    colorClassName || variantClassName,
    variant !== BUTTON.BASE
      ? (BUTTON_SIZE_CLASS[size] ??
          BUTTON_SIZE_CLASS[SIZE.SM])
      : STRING.Empty,
    variant !== BUTTON.BASE
      ? resolveButtonRadiusClassName(radius)
      : STRING.Empty,
    stateClassName,
    props.className ?? STRING.Empty
  );
};

export const getButtonClassName = (
  props: ButtonProps
): string => {
  const variant = props.variant ?? BUTTON.PRIMARY;
  const stateClassName = resolveButtonStateClassName(props);
  const actionClassName = BUTTON_ACTION_CLASS[variant];

  if (variant === BUTTON.BASE) {
    return buildBaseButtonClassName(props, stateClassName);
  }

  if (actionClassName) {
    return buildActionButtonClassName(
      props,
      actionClassName,
      stateClassName
    );
  }

  return buildStandardButtonClassName(
    props,
    stateClassName
  );
};
