import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { RESERVATION_DETAIL_COPY as copy } from "../constants/ReservationDetailCopy.constants";
import {
  RESERVATION_DETAIL_STATUS_COPY,
  RESERVATION_DETAIL_TYPE_COPY,
} from "../constants/ReservationDetailPresentation.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import {
  RESERVATION_DETAIL_CODE_CLASS,
  RESERVATION_DETAIL_HEADER_CLASS,
  RESERVATION_DETAIL_HEADER_META_CLASS,
  RESERVATION_DETAIL_STATUS_CLASS,
  RESERVATION_DETAIL_STATUS_DOT_CLASS,
  RESERVATION_DETAIL_TITLE_CLASS,
} from "../styles/ReservationDetail.styles";

const ReservationDetailHeader = ({
  detail,
}: ReservationDetailProps): React.JSX.Element => (
  <header className={RESERVATION_DETAIL_HEADER_CLASS}>
    <div className={RESERVATION_DETAIL_HEADER_META_CLASS}>
      <InlineText className={RESERVATION_DETAIL_CODE_CLASS}>
        {detail.code}
      </InlineText>
      <Title
        variant={TitleVariant.PRIMARY}
        text={detail.customer_name}
        className={RESERVATION_DETAIL_TITLE_CLASS}
      />
      <Text>
        {RESERVATION_DETAIL_TYPE_COPY[detail.type]}
        {detail.comboName !== null
          ? `${copy.COMBO_SEPARATOR}${detail.comboName}`
          : null}
      </Text>
    </div>
    <InlineText className={RESERVATION_DETAIL_STATUS_CLASS}>
      <span
        aria-hidden="true"
        className={RESERVATION_DETAIL_STATUS_DOT_CLASS}
      />
      {RESERVATION_DETAIL_STATUS_COPY[detail.status]}
    </InlineText>
  </header>
);

export default ReservationDetailHeader;
