import { memo } from "react";
import { ButtonProps } from "./models/ButtonProps.interface";
import { getButtonClassName } from "./utils/getButtonClassName";

export const Button = ({
  children,
  isLoading = false,
  disabled = false,
  className: additionalClassName,
  ...rest
}: ButtonProps) => {
  const className = getButtonClassName({
    children,
    className: additionalClassName,
    isLoading,
    disabled,
    ...rest,
  });
  return (
    <button
      className={className}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default memo(Button);
