import { Link, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import { RESERVATION_CHARGE_FIELD_ID } from "../constants/ReservationChargeUi.constants";
import { RESERVATION_CHARGE_UI_COPY } from "../constants/ReservationChargeUiCopy.constants";
import type { ReservationChargeLayoutProps } from "../models/ReservationChargeLayoutProps.interface";
import {
  RESERVATION_CHARGE_BACK_CLASS,
  RESERVATION_CHARGE_CARD_CLASS,
  RESERVATION_CHARGE_HEADER_CLASS,
  RESERVATION_CHARGE_MAIN_CLASS,
  RESERVATION_CHARGE_PAGE_CLASS,
  RESERVATION_CHARGE_TITLE_CLASS,
} from "../styles/ReservationCharge.styles";

const ReservationChargeLayout = ({
  children,
  reservationId,
}: ReservationChargeLayoutProps): React.JSX.Element => (
  <main
    aria-labelledby={RESERVATION_CHARGE_FIELD_ID.HEADING}
    className={RESERVATION_CHARGE_MAIN_CLASS}
  >
    <div className={RESERVATION_CHARGE_PAGE_CLASS}>
      <header className={RESERVATION_CHARGE_HEADER_CLASS}>
        <Link
          href={PATHS.RESERVATIONS.DETAIL(reservationId)}
          className={RESERVATION_CHARGE_BACK_CLASS}
        >
          {RESERVATION_CHARGE_UI_COPY.BACK_TO_RESERVATION}
        </Link>
        <Title
          id={RESERVATION_CHARGE_FIELD_ID.HEADING}
          variant={TitleVariant.PRIMARY}
          text={RESERVATION_CHARGE_UI_COPY.TITLE}
          className={RESERVATION_CHARGE_TITLE_CLASS}
        />
      </header>
      <div className={RESERVATION_CHARGE_CARD_CLASS}>
        {children}
      </div>
    </div>
  </main>
);

export default ReservationChargeLayout;
