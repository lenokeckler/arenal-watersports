import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import type { ReservationDetailOverviewEntryProps } from "../models/ReservationDetailOverviewEntryProps.interface";
import {
  RESERVATION_DETAIL_LABEL_CLASS,
  RESERVATION_DETAIL_OVERVIEW_ITEM_CLASS,
  RESERVATION_DETAIL_VALUE_CLASS,
} from "../styles/ReservationDetail.styles";

const ReservationDetailOverviewEntry = ({
  label,
  value,
}: ReservationDetailOverviewEntryProps): React.JSX.Element => (
  <div className={RESERVATION_DETAIL_OVERVIEW_ITEM_CLASS}>
    <InlineText className={RESERVATION_DETAIL_LABEL_CLASS}>
      {label}
    </InlineText>
    <Text className={RESERVATION_DETAIL_VALUE_CLASS}>
      {value}
    </Text>
  </div>
);

export default ReservationDetailOverviewEntry;
