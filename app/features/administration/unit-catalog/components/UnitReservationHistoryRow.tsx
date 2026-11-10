import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import type { UnitReservationRowViewModel } from "../models/UnitReservationRowViewModel.interface";
import {
  UNIT_RESERVATION_HISTORY_CODE_CLASS,
  UNIT_RESERVATION_HISTORY_CUSTOMER_CLASS,
  UNIT_RESERVATION_HISTORY_HEADING_CLASS,
  UNIT_RESERVATION_HISTORY_ROW_CLASS,
  UNIT_RESERVATION_HISTORY_START_CLASS,
  UNIT_RESERVATION_HISTORY_STATUS_CHIP_CLASS,
} from "../styles/UnitReservationHistory.styles";

const UnitReservationHistoryRow = ({
  code,
  customerName,
  startsAtText,
  statusLabel,
}: UnitReservationRowViewModel): React.JSX.Element => (
  <div className={UNIT_RESERVATION_HISTORY_ROW_CLASS}>
    <div className={UNIT_RESERVATION_HISTORY_HEADING_CLASS}>
      <InlineText
        className={UNIT_RESERVATION_HISTORY_CODE_CLASS}
      >
        {code}
      </InlineText>
      <InlineText
        className={
          UNIT_RESERVATION_HISTORY_STATUS_CHIP_CLASS
        }
      >
        {statusLabel}
      </InlineText>
    </div>
    <Text
      className={UNIT_RESERVATION_HISTORY_CUSTOMER_CLASS}
    >
      {customerName}
    </Text>
    <Text className={UNIT_RESERVATION_HISTORY_START_CLASS}>
      {startsAtText}
    </Text>
  </div>
);

export default UnitReservationHistoryRow;
