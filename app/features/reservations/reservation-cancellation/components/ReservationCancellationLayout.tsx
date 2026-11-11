import { Link, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import { RESERVATION_CANCELLATION_FIELD_ID } from "../constants/ReservationCancellationUi.constants";
import { RESERVATION_CANCELLATION_UI_COPY } from "../constants/ReservationCancellationUiCopy.constants";
import type { ReservationCancellationLayoutProps } from "../models/ReservationCancellationLayoutProps.interface";
import {
  RESERVATION_CANCELLATION_BACK_CLASS,
  RESERVATION_CANCELLATION_CARD_CLASS,
  RESERVATION_CANCELLATION_HEADER_CLASS,
  RESERVATION_CANCELLATION_MAIN_CLASS,
  RESERVATION_CANCELLATION_PAGE_CLASS,
  RESERVATION_CANCELLATION_TITLE_CLASS,
} from "../styles/ReservationCancellation.styles";

const ReservationCancellationLayout = ({
  children,
}: ReservationCancellationLayoutProps): React.JSX.Element => (
  <main
    aria-labelledby={
      RESERVATION_CANCELLATION_FIELD_ID.HEADING
    }
    className={RESERVATION_CANCELLATION_MAIN_CLASS}
  >
    <div className={RESERVATION_CANCELLATION_PAGE_CLASS}>
      <header
        className={RESERVATION_CANCELLATION_HEADER_CLASS}
      >
        <Link
          href={PATHS.RESERVATIONS.CALENDAR}
          className={RESERVATION_CANCELLATION_BACK_CLASS}
        >
          {
            RESERVATION_CANCELLATION_UI_COPY.BACK_TO_CALENDAR
          }
        </Link>
        <Title
          id={RESERVATION_CANCELLATION_FIELD_ID.HEADING}
          variant={TitleVariant.PRIMARY}
          text={RESERVATION_CANCELLATION_UI_COPY.TITLE}
          className={RESERVATION_CANCELLATION_TITLE_CLASS}
        />
      </header>
      <div className={RESERVATION_CANCELLATION_CARD_CLASS}>
        {children}
      </div>
    </div>
  </main>
);

export default ReservationCancellationLayout;
