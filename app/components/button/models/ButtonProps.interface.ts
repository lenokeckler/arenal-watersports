import { ButtonHTMLAttributes, ReactNode } from "react";
import { BUTTON, SIZE } from "../constants";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: BUTTON;
  size?: SIZE;
  disabled?: boolean;
  radius?: SIZE;
  color?: string;
  className?: string;
}
