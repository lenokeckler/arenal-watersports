import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import type { ReservationDetailAuditRowProps } from "../models/ReservationDetailAuditRowProps.interface";
import {
  RESERVATION_DETAIL_AUDIT_ITEM_CLASS,
  RESERVATION_DETAIL_LABEL_CLASS,
  RESERVATION_DETAIL_VALUE_CLASS,
} from "../styles/ReservationDetailSections.styles";

const ReservationDetailAuditRow = ({
  date,
  label,
  name,
}: ReservationDetailAuditRowProps): React.JSX.Element => (
  <div className={RESERVATION_DETAIL_AUDIT_ITEM_CLASS}>
    <InlineText className={RESERVATION_DETAIL_LABEL_CLASS}>
      {label}
    </InlineText>
    <Text className={RESERVATION_DETAIL_VALUE_CLASS}>
      {name}
    </Text>
    <Text>{date}</Text>
  </div>
);

export default ReservationDetailAuditRow;
