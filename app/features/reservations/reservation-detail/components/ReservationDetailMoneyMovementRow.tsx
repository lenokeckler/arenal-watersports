import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { formatReservationCalendarDateTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarDateTime";
import {
  RESERVATION_DETAIL_MOVEMENTS_COPY as copy,
  RESERVATION_DETAIL_MOVEMENT_TYPE_COPY,
} from "../constants/ReservationDetailMovementsCopy.constants";
import { RESERVATION_DETAIL_SECTIONS_COPY } from "../constants/ReservationDetailSectionsCopy.constants";
import type { ReservationDetailMoneyMovementRowProps } from "../models/ReservationDetailMoneyMovementRowProps.interface";
import {
  RESERVATION_DETAIL_MOVEMENT_AMOUNT_CLASS,
  RESERVATION_DETAIL_MOVEMENT_AMOUNT_GROUP_CLASS,
  RESERVATION_DETAIL_MOVEMENT_CURRENCY_CLASS,
  RESERVATION_DETAIL_MOVEMENT_FIELDS_CLASS,
  RESERVATION_DETAIL_MOVEMENT_HEAD_CLASS,
  RESERVATION_DETAIL_MOVEMENT_ROW_CLASS,
  resolveReservationDetailMovementTypeClassName,
} from "../styles/ReservationDetailMoneyMovements.styles";
import { RESERVATION_DETAIL_ROW_TITLE_CLASS } from "../styles/ReservationDetailSections.styles";
import { formatReservationDetailAmount } from "../utils/formatReservationDetailAmount";
import ReservationDetailMoneyMovementField from "./ReservationDetailMoneyMovementField";

const ReservationDetailMoneyMovementRow = ({
  movement,
}: ReservationDetailMoneyMovementRowProps): React.JSX.Element => (
  <div className={RESERVATION_DETAIL_MOVEMENT_ROW_CLASS}>
    <div className={RESERVATION_DETAIL_MOVEMENT_HEAD_CLASS}>
      <div
        className={
          RESERVATION_DETAIL_MOVEMENT_AMOUNT_GROUP_CLASS
        }
      >
        <Text
          className={
            RESERVATION_DETAIL_MOVEMENT_AMOUNT_CLASS
          }
        >
          {formatReservationDetailAmount(
            movement.amount,
            movement.currency
          )}
        </Text>
        <InlineText
          className={
            RESERVATION_DETAIL_MOVEMENT_CURRENCY_CLASS
          }
        >
          {movement.currency}
        </InlineText>
      </div>
      <InlineText
        className={resolveReservationDetailMovementTypeClassName(
          movement.type
        )}
      >
        {
          RESERVATION_DETAIL_MOVEMENT_TYPE_COPY[
            movement.type
          ]
        }
      </InlineText>
    </div>
    <Text className={RESERVATION_DETAIL_ROW_TITLE_CLASS}>
      {movement.concept}
    </Text>
    <div
      className={RESERVATION_DETAIL_MOVEMENT_FIELDS_CLASS}
    >
      <ReservationDetailMoneyMovementField
        label={copy.METHOD}
        value={
          movement.paymentMethod ??
          copy.METHOD_NOT_APPLICABLE
        }
      />
      <ReservationDetailMoneyMovementField
        label={copy.DATE}
        value={formatReservationCalendarDateTime(
          movement.createdAt
        )}
      />
      <ReservationDetailMoneyMovementField
        label={copy.RECORDED_BY}
        value={
          movement.recordedByName ??
          RESERVATION_DETAIL_SECTIONS_COPY.MISSING_NAME
        }
      />
    </div>
  </div>
);

export default ReservationDetailMoneyMovementRow;
