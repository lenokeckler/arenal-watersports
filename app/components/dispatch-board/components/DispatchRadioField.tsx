"use client";

import FormField from "@/app/components/form-field/FormField";
import {
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import {
  DISPATCH_SHEET_COPY,
  DISPATCH_SHEET_FIELD_ID,
} from "../constants/DispatchSheetCopy.constants";
import type { DispatchRadioFieldProps } from "../models/DispatchRadioFieldProps.interface";

const DispatchRadioField = ({
  radio,
}: DispatchRadioFieldProps): React.JSX.Element => (
  <FormField
    id={DISPATCH_SHEET_FIELD_ID.RADIO}
    name={DISPATCH_SHEET_FIELD_ID.RADIO}
    label={DISPATCH_SHEET_COPY.RADIO_FIELD_LABEL}
    labelSuffix={STRING.Empty}
    type={INPUT_TYPES.TEXT}
    inputMode={INPUT_MODE.NUMERIC}
    placeholder={DISPATCH_SHEET_COPY.RADIO_PLACEHOLDER}
    value={radio.text}
    error={radio.error ?? undefined}
    showErrorText
    onChange={radio.handleChange}
  />
);

export default DispatchRadioField;
