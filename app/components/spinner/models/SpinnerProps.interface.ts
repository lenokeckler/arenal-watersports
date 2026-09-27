import { SPINNER_SIZE } from "../constants/Spinner.constants";

export type SpinnerSize =
  (typeof SPINNER_SIZE)[keyof typeof SPINNER_SIZE];

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  fullScreen?: boolean;
  centeredInForm?: boolean;
}
