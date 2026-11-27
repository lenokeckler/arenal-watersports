import Text from "@/app/components/text/Text";
import type { ReservationDetailMoneyMovementFieldProps } from "../models/ReservationDetailMoneyMovementFieldProps.interface";
import { RESERVATION_DETAIL_LABEL_CLASS } from "../styles/ReservationDetail.styles";
import {
  RESERVATION_DETAIL_MOVEMENT_FIELD_CLASS,
  RESERVATION_DETAIL_MOVEMENT_FIELD_VALUE_CLASS,
} from "../styles/ReservationDetailMoneyMovements.styles";

const ReservationDetailMoneyMovementField = ({
  label,
  value,
}: ReservationDetailMoneyMovementFieldProps): React.JSX.Element => (
  <div className={RESERVATION_DETAIL_MOVEMENT_FIELD_CLASS}>
    <Text className={RESERVATION_DETAIL_LABEL_CLASS}>
      {label}
    </Text>
    <Text
      className={
        RESERVATION_DETAIL_MOVEMENT_FIELD_VALUE_CLASS
      }
    >
      {value}
    </Text>
  </div>
);

export default ReservationDetailMoneyMovementField;
