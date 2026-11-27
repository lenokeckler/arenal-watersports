import { Link, Text, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_FORM_COPY as FORM_COPY } from "../constants/ReservationExtraTimeFormCopy.constants";
import { RESERVATION_EXTRA_TIME_FIELD_ID } from "../constants/ReservationExtraTimeUi.constants";
import { RESERVATION_EXTRA_TIME_UI_COPY as COPY } from "../constants/ReservationExtraTimeUiCopy.constants";
import type { ReservationExtraTimeLayoutProps } from "../models/ReservationExtraTimeLayoutProps.interface";
import {
  RESERVATION_EXTRA_TIME_BACK_CLASS,
  RESERVATION_EXTRA_TIME_CARD_CLASS,
  RESERVATION_EXTRA_TIME_HEADER_CLASS,
  RESERVATION_EXTRA_TIME_MAIN_CLASS,
  RESERVATION_EXTRA_TIME_PAGE_CLASS,
  RESERVATION_EXTRA_TIME_SUBTITLE_CLASS,
  RESERVATION_EXTRA_TIME_TITLE_CLASS,
} from "../styles/ReservationExtraTime.styles";

const ReservationExtraTimeLayout = ({
  children,
  extraTime,
}: ReservationExtraTimeLayoutProps): React.JSX.Element => (
  <main
    aria-labelledby={
      RESERVATION_EXTRA_TIME_FIELD_ID.HEADING
    }
    className={RESERVATION_EXTRA_TIME_MAIN_CLASS}
  >
    <div className={RESERVATION_EXTRA_TIME_PAGE_CLASS}>
      <header
        className={RESERVATION_EXTRA_TIME_HEADER_CLASS}
      >
        <Link
          href={PATHS.RESERVATIONS.DETAIL(extraTime.id)}
          className={RESERVATION_EXTRA_TIME_BACK_CLASS}
        >
          {FORM_COPY.BACK}
        </Link>
        <Title
          id={RESERVATION_EXTRA_TIME_FIELD_ID.HEADING}
          variant={TitleVariant.PRIMARY}
          text={COPY.TITLE}
          className={RESERVATION_EXTRA_TIME_TITLE_CLASS}
        />
        <Text
          className={RESERVATION_EXTRA_TIME_SUBTITLE_CLASS}
        >
          {COPY.RESERVATION(
            extraTime.code,
            extraTime.customerName
          )}
        </Text>
      </header>
      <div className={RESERVATION_EXTRA_TIME_CARD_CLASS}>
        {children}
      </div>
    </div>
  </main>
);

export default ReservationExtraTimeLayout;
