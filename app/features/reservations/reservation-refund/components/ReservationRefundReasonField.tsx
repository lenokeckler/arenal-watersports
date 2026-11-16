import { Text } from "@/app/components";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON_OPTIONS } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_REASON_COPY } from "../constants/ReservationRefundReasonCopy.constants";
import {
  RESERVATION_REFUND_FIELD_ID,
  RESERVATION_REFUND_REASON_OPTION_ID,
} from "../constants/ReservationRefundUi.constants";
import type { ReservationRefundReasonFieldProps } from "../models/ReservationRefundReasonFieldProps.interface";
import { RESERVATION_REFUND_FIELD_ERROR_CLASS } from "../styles/ReservationRefundForm.styles";
import {
  RESERVATION_REFUND_REASON_FIELDSET_CLASS,
  RESERVATION_REFUND_REASON_GRID_CLASS,
  RESERVATION_REFUND_REASON_LEGEND_CLASS,
} from "../styles/ReservationRefundChoice.styles";
import ReservationRefundReasonOption from "./ReservationRefundReasonOption";

const ReservationRefundReasonField = ({
  error,
  isPending,
  onSelect,
  reason: selectedReason,
}: ReservationRefundReasonFieldProps): React.JSX.Element => (
  <fieldset
    aria-describedby={
      error
        ? RESERVATION_REFUND_FIELD_ID.REASON_ERROR
        : undefined
    }
    className={RESERVATION_REFUND_REASON_FIELDSET_CLASS}
  >
    <legend
      className={RESERVATION_REFUND_REASON_LEGEND_CLASS}
    >
      {COPY.REASON_LEGEND}
    </legend>
    <div className={RESERVATION_REFUND_REASON_GRID_CLASS}>
      {RESERVATION_REFUND_REASON_OPTIONS.map((reason) => (
        <ReservationRefundReasonOption
          key={reason}
          id={RESERVATION_REFUND_REASON_OPTION_ID(reason)}
          isDisabled={isPending}
          isInvalid={Boolean(error)}
          isSelected={selectedReason === reason}
          label={RESERVATION_REFUND_REASON_COPY[reason]}
          onSelect={onSelect}
          value={reason}
        />
      ))}
    </div>
    {error && (
      <Text
        id={RESERVATION_REFUND_FIELD_ID.REASON_ERROR}
        className={RESERVATION_REFUND_FIELD_ERROR_CLASS}
      >
        {error}
      </Text>
    )}
  </fieldset>
);

export default ReservationRefundReasonField;
