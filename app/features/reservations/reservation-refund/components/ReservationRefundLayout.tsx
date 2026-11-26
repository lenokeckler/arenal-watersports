import { Link, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import { RESERVATION_REFUND_FIELD_ID } from "../constants/ReservationRefundUi.constants";
import { RESERVATION_REFUND_UI_COPY } from "../constants/ReservationRefundUiCopy.constants";
import type { ReservationRefundLayoutProps } from "../models/ReservationRefundLayoutProps.interface";
import {
  RESERVATION_REFUND_BACK_CLASS,
  RESERVATION_REFUND_CARD_CLASS,
  RESERVATION_REFUND_HEADER_CLASS,
  RESERVATION_REFUND_MAIN_CLASS,
  RESERVATION_REFUND_PAGE_CLASS,
  RESERVATION_REFUND_TITLE_CLASS,
} from "../styles/ReservationRefund.styles";

const ReservationRefundLayout = ({
  children,
  reservationId,
}: ReservationRefundLayoutProps): React.JSX.Element => (
  <main
    aria-labelledby={RESERVATION_REFUND_FIELD_ID.HEADING}
    className={RESERVATION_REFUND_MAIN_CLASS}
  >
    <div className={RESERVATION_REFUND_PAGE_CLASS}>
      <header className={RESERVATION_REFUND_HEADER_CLASS}>
        <Link
          href={PATHS.RESERVATIONS.DETAIL(reservationId)}
          className={RESERVATION_REFUND_BACK_CLASS}
        >
          {RESERVATION_REFUND_UI_COPY.BACK_TO_RESERVATION}
        </Link>
        <Title
          id={RESERVATION_REFUND_FIELD_ID.HEADING}
          variant={TitleVariant.PRIMARY}
          text={RESERVATION_REFUND_UI_COPY.TITLE}
          className={RESERVATION_REFUND_TITLE_CLASS}
        />
      </header>
      <div className={RESERVATION_REFUND_CARD_CLASS}>
        {children}
      </div>
    </div>
  </main>
);

export default ReservationRefundLayout;
