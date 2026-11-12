import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import type { ReservationDetailDispatchTimeProps } from "../models/ReservationDetailDispatchTimeProps.interface";
import {
  RESERVATION_DETAIL_LABEL_CLASS,
  RESERVATION_DETAIL_METRIC_CLASS,
} from "../styles/ReservationDetailSections.styles";

const ReservationDetailDispatchTime = ({
  label,
  value,
}: ReservationDetailDispatchTimeProps): React.JSX.Element => (
  <div className={RESERVATION_DETAIL_METRIC_CLASS}>
    <InlineText className={RESERVATION_DETAIL_LABEL_CLASS}>
      {label}
    </InlineText>
    <Text>{value}</Text>
  </div>
);

export default ReservationDetailDispatchTime;
