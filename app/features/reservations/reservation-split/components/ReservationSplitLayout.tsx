import { Link, Text, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import { RESERVATION_SPLIT_FIELD_ID } from "../constants/ReservationSplitUi.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitLayoutProps } from "../models/ReservationSplitLayoutProps.interface";
import {
  RESERVATION_SPLIT_BACK_CLASS,
  RESERVATION_SPLIT_CARD_CLASS,
  RESERVATION_SPLIT_DESCRIPTION_CLASS,
  RESERVATION_SPLIT_HEADER_CLASS,
  RESERVATION_SPLIT_MAIN_CLASS,
  RESERVATION_SPLIT_PAGE_CLASS,
  RESERVATION_SPLIT_TITLE_CLASS,
} from "../styles/ReservationSplitLayout.styles";

const ReservationSplitLayout = ({
  children,
}: ReservationSplitLayoutProps): React.JSX.Element => (
  <main className={RESERVATION_SPLIT_MAIN_CLASS}>
    <div className={RESERVATION_SPLIT_PAGE_CLASS}>
      <header className={RESERVATION_SPLIT_HEADER_CLASS}>
        <Link
          href={PATHS.RESERVATIONS.CALENDAR}
          className={RESERVATION_SPLIT_BACK_CLASS}
        >
          {RESERVATION_SPLIT_UI_COPY.BACK_TO_CALENDAR}
        </Link>
        <Title
          id={RESERVATION_SPLIT_FIELD_ID.HEADING}
          variant={TitleVariant.PRIMARY}
          text={RESERVATION_SPLIT_UI_COPY.TITLE}
          className={RESERVATION_SPLIT_TITLE_CLASS}
        />
        <Text
          className={RESERVATION_SPLIT_DESCRIPTION_CLASS}
        >
          {RESERVATION_SPLIT_UI_COPY.DESCRIPTION}
        </Text>
      </header>
      <div className={RESERVATION_SPLIT_CARD_CLASS}>
        {children}
      </div>
    </div>
  </main>
);

export default ReservationSplitLayout;
