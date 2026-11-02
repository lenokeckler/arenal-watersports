import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { RESERVATION_DETAIL_SECTIONS_COPY as copy } from "../constants/ReservationDetailSectionsCopy.constants";
import type { ReservationDetailExtraRowProps } from "../models/ReservationDetailExtraRowProps.interface";
import {
  RESERVATION_DETAIL_CHIP_CLASS,
  RESERVATION_DETAIL_ROW_CLASS,
  RESERVATION_DETAIL_ROW_TITLE_CLASS,
} from "../styles/ReservationDetailSections.styles";

const ReservationDetailExtraRow = ({
  extra,
}: ReservationDetailExtraRowProps): React.JSX.Element => (
  <div className={RESERVATION_DETAIL_ROW_CLASS}>
    <div>
      <Text className={RESERVATION_DETAIL_ROW_TITLE_CLASS}>
        {extra.name}
      </Text>
      {extra.categoryName === null ? null : (
        <Text>{extra.categoryName}</Text>
      )}
    </div>
    {extra.quantity === null ? null : (
      <InlineText className={RESERVATION_DETAIL_CHIP_CLASS}>
        {`${copy.QUANTITY}: ${extra.quantity}`}
      </InlineText>
    )}
  </div>
);

export default ReservationDetailExtraRow;
