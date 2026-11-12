import { InlineText, Text } from "@/app/components";
import { STRING } from "@/app/constants";
import type { ReservationHistoryRowLineProps } from "../models/ReservationHistoryRowLineProps.interface";
import {
  RESERVATION_HISTORY_ROW_LINE_CLASS,
  RESERVATION_HISTORY_ROW_LINE_LABEL_CLASS,
} from "../styles/ReservationHistoryRow.styles";

const ReservationHistoryRowLine = ({
  label,
  value,
  valueClassName,
}: ReservationHistoryRowLineProps): React.JSX.Element => (
  <Text className={RESERVATION_HISTORY_ROW_LINE_CLASS}>
    <InlineText
      className={RESERVATION_HISTORY_ROW_LINE_LABEL_CLASS}
    >
      {label}
      {STRING.SPACE}
    </InlineText>
    <InlineText className={valueClassName}>
      {value}
    </InlineText>
  </Text>
);

export default ReservationHistoryRowLine;
