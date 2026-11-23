"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import FormField from "@/app/components/form-field/FormField";
import {
  BUTTON_TYPES,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchTimeAdjusterProps } from "../models/DispatchTimeAdjusterProps.interface";
import {
  DISPATCH_TIME_ADJUSTER_CLASS,
  DISPATCH_TIME_ADJUSTER_ROW_CLASS,
  DISPATCH_TIME_SHIFT_CLASS,
} from "../styles/DispatchSteps.styles";

const SOONER_DIRECTION = -1;
const LATER_DIRECTION = 1;

const DispatchTimeAdjuster = ({
  fieldId,
  label,
  laterLabel,
  onChange,
  onShift,
  soonerLabel,
  value,
}: DispatchTimeAdjusterProps): React.JSX.Element => (
  <div className={DISPATCH_TIME_ADJUSTER_CLASS}>
    <div className={DISPATCH_TIME_ADJUSTER_ROW_CLASS}>
      <FormField
        id={fieldId}
        name={fieldId}
        label={label}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.TIME}
        value={value}
        onChange={onChange}
      />
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.SECONDARY}
        className={DISPATCH_TIME_SHIFT_CLASS}
        aria-label={soonerLabel}
        onClick={() => onShift(SOONER_DIRECTION)}
      >
        {DISPATCH_SHEET_COPY.SHIFT_SOONER_TEXT}
      </Button>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.SECONDARY}
        className={DISPATCH_TIME_SHIFT_CLASS}
        aria-label={laterLabel}
        onClick={() => onShift(LATER_DIRECTION)}
      >
        {DISPATCH_SHEET_COPY.SHIFT_LATER_TEXT}
      </Button>
    </div>
  </div>
);

export default DispatchTimeAdjuster;
