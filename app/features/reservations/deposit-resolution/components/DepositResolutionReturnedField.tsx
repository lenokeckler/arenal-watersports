import {
  FormField,
  InlineText,
  Text,
} from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { DEPOSIT_RESOLUTION_FORM_COPY as COPY } from "../constants/DepositResolutionFormCopy.constants";
import { DEPOSIT_RESOLUTION_FIELD_ID as FIELD_ID } from "../constants/DepositResolutionUi.constants";
import type { DepositResolutionReturnedFieldProps } from "../models/DepositResolutionReturnedFieldProps.interface";
import {
  DEPOSIT_RESOLUTION_AMOUNT_INPUT_CLASS,
  DEPOSIT_RESOLUTION_HINT_CLASS,
  DEPOSIT_RESOLUTION_KEPT_AMOUNT_CLASS,
  DEPOSIT_RESOLUTION_KEPT_CLASS,
  DEPOSIT_RESOLUTION_KEPT_LABEL_CLASS,
} from "../styles/DepositResolutionForm.styles";

const DepositResolutionReturnedField = ({
  deposit,
  error,
  isPending,
  keptAmount,
  onChange,
  text,
}: DepositResolutionReturnedFieldProps): React.JSX.Element => (
  <div>
    <FormField
      id={FIELD_ID.RETURNED}
      name={FIELD_ID.RETURNED}
      label={COPY.RETURNED_LABEL}
      type={INPUT_TYPES.TEXT}
      inputMode={INPUT_MODE.DECIMAL}
      autoComplete={AUTOCOMPLETE.OFF}
      spellCheck={false}
      placeholder={COPY.RETURNED_PLACEHOLDER}
      classNameField={DEPOSIT_RESOLUTION_AMOUNT_INPUT_CLASS}
      value={text}
      disabled={isPending}
      describedBy={FIELD_ID.RETURNED_HELPER}
      onChange={(event) => onChange(event.target.value)}
      error={error}
      showErrorText
      variant={FORM_FIELD_VARIANT.GLASS}
    />
    <Text
      id={FIELD_ID.RETURNED_HELPER}
      className={DEPOSIT_RESOLUTION_HINT_CLASS}
    >
      {COPY.RETURNED_HELPER(formatMoney(deposit))}
    </Text>
    {keptAmount === null ? null : (
      <div
        aria-live="polite"
        className={DEPOSIT_RESOLUTION_KEPT_CLASS}
      >
        <InlineText
          className={DEPOSIT_RESOLUTION_KEPT_LABEL_CLASS}
        >
          {COPY.KEPT_LABEL}
        </InlineText>
        <InlineText
          className={DEPOSIT_RESOLUTION_KEPT_AMOUNT_CLASS}
        >
          {formatMoney({
            amount: keptAmount,
            currency: deposit.currency,
          })}
        </InlineText>
      </div>
    )}
  </div>
);

export default DepositResolutionReturnedField;
