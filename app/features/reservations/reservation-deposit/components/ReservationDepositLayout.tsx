import { Link, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import { RESERVATION_DEPOSIT_FIELD_ID } from "../constants/ReservationDepositUi.constants";
import { RESERVATION_DEPOSIT_UI_COPY } from "../constants/ReservationDepositUiCopy.constants";
import type { ReservationDepositLayoutProps } from "../models/ReservationDepositLayoutProps.interface";
import {
  RESERVATION_DEPOSIT_BACK_CLASS,
  RESERVATION_DEPOSIT_CARD_CLASS,
  RESERVATION_DEPOSIT_HEADER_CLASS,
  RESERVATION_DEPOSIT_MAIN_CLASS,
  RESERVATION_DEPOSIT_PAGE_CLASS,
  RESERVATION_DEPOSIT_TITLE_CLASS,
} from "../styles/ReservationDeposit.styles";

const ReservationDepositLayout = ({
  children,
  reservationId,
}: ReservationDepositLayoutProps): React.JSX.Element => (
  <main
    aria-labelledby={RESERVATION_DEPOSIT_FIELD_ID.HEADING}
    className={RESERVATION_DEPOSIT_MAIN_CLASS}
  >
    <div className={RESERVATION_DEPOSIT_PAGE_CLASS}>
      <header className={RESERVATION_DEPOSIT_HEADER_CLASS}>
        <Link
          href={PATHS.RESERVATIONS.DETAIL(reservationId)}
          className={RESERVATION_DEPOSIT_BACK_CLASS}
        >
          {RESERVATION_DEPOSIT_UI_COPY.BACK_TO_RESERVATION}
        </Link>
        <Title
          id={RESERVATION_DEPOSIT_FIELD_ID.HEADING}
          variant={TitleVariant.PRIMARY}
          text={RESERVATION_DEPOSIT_UI_COPY.TITLE}
          className={RESERVATION_DEPOSIT_TITLE_CLASS}
        />
      </header>
      <div className={RESERVATION_DEPOSIT_CARD_CLASS}>
        {children}
      </div>
    </div>
  </main>
);

export default ReservationDepositLayout;
