import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { AUTOCOMPLETE, INPUT_TYPES } from "@/app/constants";
import { DEPOSIT_RESOLUTION_FORM_COPY as COPY } from "../constants/DepositResolutionFormCopy.constants";
import { DEPOSIT_RESOLUTION_FIELD_ID as FIELD_ID } from "../constants/DepositResolutionUi.constants";
import type { DepositResolutionReasonFieldProps } from "../models/DepositResolutionReasonFieldProps.interface";
import { DEPOSIT_RESOLUTION_HINT_CLASS } from "../styles/DepositResolutionForm.styles";

const DepositResolutionReasonField = ({
  error,
  isPending,
  onChange,
  text,
}: DepositResolutionReasonFieldProps): React.JSX.Element => (
  <div>
    <FormField
      id={FIELD_ID.REASON}
      name={FIELD_ID.REASON}
      label={COPY.REASON_LABEL}
      type={INPUT_TYPES.TEXTAREA}
      autoComplete={AUTOCOMPLETE.OFF}
      value={text}
      disabled={isPending}
      describedBy={FIELD_ID.REASON_HELPER}
      onChange={(event) => onChange(event.target.value)}
      error={error}
      showErrorText
      variant={FORM_FIELD_VARIANT.GLASS}
    />
    <Text
      id={FIELD_ID.REASON_HELPER}
      className={DEPOSIT_RESOLUTION_HINT_CLASS}
    >
      {COPY.REASON_HELPER}
    </Text>
  </div>
);

export default DepositResolutionReasonField;
