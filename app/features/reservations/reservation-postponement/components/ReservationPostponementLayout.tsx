import { Link, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_FIELD_ID } from "../constants/ReservationPostponementUi.constants";
import { RESERVATION_POSTPONEMENT_UI_COPY } from "../constants/ReservationPostponementUiCopy.constants";
import type { ReservationPostponementLayoutProps } from "../models/ReservationPostponementLayoutProps.interface";
import {
  RESERVATION_POSTPONEMENT_BACK_CLASS,
  RESERVATION_POSTPONEMENT_CARD_CLASS,
  RESERVATION_POSTPONEMENT_HEADER_CLASS,
  RESERVATION_POSTPONEMENT_MAIN_CLASS,
  RESERVATION_POSTPONEMENT_PAGE_CLASS,
  RESERVATION_POSTPONEMENT_TITLE_CLASS,
} from "../styles/ReservationPostponementLayout.styles";

const ReservationPostponementLayout = ({
  children,
}: ReservationPostponementLayoutProps): React.JSX.Element => (
  <main
    aria-labelledby={
      RESERVATION_POSTPONEMENT_FIELD_ID.HEADING
    }
    className={RESERVATION_POSTPONEMENT_MAIN_CLASS}
  >
    <div className={RESERVATION_POSTPONEMENT_PAGE_CLASS}>
      <header
        className={RESERVATION_POSTPONEMENT_HEADER_CLASS}
      >
        <Link
          href={PATHS.RESERVATIONS.CALENDAR}
          className={RESERVATION_POSTPONEMENT_BACK_CLASS}
        >
          {
            RESERVATION_POSTPONEMENT_UI_COPY.BACK_TO_CALENDAR
          }
        </Link>
        <Title
          id={RESERVATION_POSTPONEMENT_FIELD_ID.HEADING}
          variant={TitleVariant.PRIMARY}
          text={RESERVATION_POSTPONEMENT_UI_COPY.TITLE}
          className={RESERVATION_POSTPONEMENT_TITLE_CLASS}
        />
      </header>
      <div className={RESERVATION_POSTPONEMENT_CARD_CLASS}>
        {children}
      </div>
    </div>
  </main>
);

export default ReservationPostponementLayout;
