import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { AUTOCOMPLETE, INPUT_TYPES } from "@/app/constants";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_FIELD_ID as FIELD_ID } from "../constants/ReservationRefundUi.constants";
import type { ReservationRefundFormProps } from "../models/ReservationRefundFormProps.interface";
import { RESERVATION_REFUND_HINT_CLASS } from "../styles/ReservationRefundForm.styles";

const ReservationRefundOtherReasonField = ({
  viewModel,
}: Pick<
  ReservationRefundFormProps,
  "viewModel"
>): React.JSX.Element => (
  <div>
    <FormField
      id={FIELD_ID.OTHER_REASON}
      name={FIELD_ID.OTHER_REASON}
      label={COPY.OTHER_LABEL}
      type={INPUT_TYPES.TEXTAREA}
      autoComplete={AUTOCOMPLETE.OFF}
      value={viewModel.otherReasonText}
      disabled={viewModel.isPending}
      describedBy={FIELD_ID.OTHER_REASON_HELPER}
      onChange={(event) =>
        viewModel.setOtherReasonText(event.target.value)
      }
      error={viewModel.errors.otherReason}
      showErrorText
      variant={FORM_FIELD_VARIANT.GLASS}
    />
    <Text
      id={FIELD_ID.OTHER_REASON_HELPER}
      className={RESERVATION_REFUND_HINT_CLASS}
    >
      {COPY.OTHER_HELPER}
    </Text>
  </div>
);

export default ReservationRefundOtherReasonField;
