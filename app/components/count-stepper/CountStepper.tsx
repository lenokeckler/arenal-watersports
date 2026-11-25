"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON_TYPES } from "@/app/constants";
import { COUNT_STEPPER_COPY } from "./constants/CountStepperCopy.constants";
import type { CountStepperProps } from "./models/CountStepperProps.interface";
import {
  COUNT_STEPPER_BUTTON_CLASS,
  COUNT_STEPPER_LABEL_CLASS,
  COUNT_STEPPER_ROW_CLASS,
  COUNT_STEPPER_VALUE_CLASS,
  COUNT_STEPPER_WRAPPER_CLASS,
} from "./styles/CountStepper.styles";

const STEP = 1;

const CountStepper = ({
  label,
  lessLabel,
  max,
  min,
  moreLabel,
  onChange,
  value,
}: CountStepperProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={label}
    className={COUNT_STEPPER_WRAPPER_CLASS}
  >
    <Text className={COUNT_STEPPER_LABEL_CLASS}>
      {label}
    </Text>
    <div className={COUNT_STEPPER_ROW_CLASS}>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.SECONDARY}
        className={COUNT_STEPPER_BUTTON_CLASS}
        aria-label={lessLabel}
        disabled={value <= min}
        onClick={() => onChange(value - STEP)}
      >
        {COUNT_STEPPER_COPY.LESS}
      </Button>
      <InlineText className={COUNT_STEPPER_VALUE_CLASS}>
        {String(value)}
      </InlineText>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.SECONDARY}
        className={COUNT_STEPPER_BUTTON_CLASS}
        aria-label={moreLabel}
        disabled={value >= max}
        onClick={() => onChange(value + STEP)}
      >
        {COUNT_STEPPER_COPY.MORE}
      </Button>
    </div>
  </div>
);

export default CountStepper;
