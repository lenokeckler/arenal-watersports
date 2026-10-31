import { memo } from "react";
import { LOADING_COPY } from "@/app/constants/strings/LoadingCopy.constants";
import { ButtonProps } from "./models/ButtonProps.interface";
import { getButtonClassName } from "./utils/getButtonClassName";

export const Button = ({
  children,
  isLoading = false,
  loadingText,
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
      {isLoading
        ? (loadingText ?? LOADING_COPY.TEXT)
        : children}
    </button>
  );
};

export default memo(Button);
