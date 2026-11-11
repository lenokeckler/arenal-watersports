import React from "react";
import { SpinnerProps } from "./models/SpinnerProps.interface";
import { useSpinnerViewModel } from "./hooks/useSpinnerViewModel";
import { SCREEN_READER_ONLY_CLASS } from "@/app/styles/ScreenReader.styles";

const Spinner = (props: SpinnerProps) => {
  const {
    containerClass,
    spinnerClass,
    role,
    ariaLabel,
    screenReaderText,
  } = useSpinnerViewModel(props);

  return (
    <div className={containerClass}>
      <div
        className={spinnerClass}
        role={role}
        aria-label={ariaLabel}
      >
        <span className={SCREEN_READER_ONLY_CLASS}>
          {screenReaderText}
        </span>
      </div>
    </div>
  );
};

export default Spinner;
