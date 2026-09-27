import {
  SPINNER_SIZE,
  SPINNER_ARIA,
} from "../constants/Spinner.constants";
import { SpinnerProps } from "../models/SpinnerProps.interface";
import { SpinnerViewModel } from "../models/SpinnerViewModel.interface";
import {
  resolveSpinnerContainerClassName,
  resolveSpinnerWheelClassName,
} from "../styles/Spinner.styles";

export const useSpinnerViewModel = ({
  size = SPINNER_SIZE.MEDIUM,
  fullScreen = false,
  centeredInForm = false,
}: SpinnerProps): SpinnerViewModel => {
  const containerClass = resolveSpinnerContainerClassName(
    fullScreen,
    centeredInForm
  );

  const spinnerClass = resolveSpinnerWheelClassName(size);

  return {
    containerClass,
    spinnerClass,
    role: SPINNER_ARIA.ROLE,
    ariaLabel: SPINNER_ARIA.LABEL,
    screenReaderText: SPINNER_ARIA.SCREEN_READER_TEXT,
  };
};
