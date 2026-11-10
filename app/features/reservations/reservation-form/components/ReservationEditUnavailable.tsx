import Link from "@/app/components/link/Link";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ARIA_ROLE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import {
  RESERVATION_EDIT_UNAVAILABLE_ACTION_CLASS,
  RESERVATION_EDIT_UNAVAILABLE_BACK_CLASS,
} from "../styles/ReservationEdit.styles";
import {
  RESERVATION_FORM_CARD_CLASS,
  RESERVATION_FORM_HEADER_CLASS,
  RESERVATION_FORM_MAIN_CLASS,
  RESERVATION_FORM_PAGE_CLASS,
  RESERVATION_FORM_STATUS_CLASS,
  RESERVATION_FORM_TITLE_CLASS,
} from "../styles/ReservationFormView.styles";

const ReservationEditUnavailable =
  (): React.JSX.Element => (
    <main className={RESERVATION_FORM_MAIN_CLASS}>
      <div className={RESERVATION_FORM_PAGE_CLASS}>
        <header className={RESERVATION_FORM_HEADER_CLASS}>
          <Link
            href={PATHS.RESERVATIONS.CALENDAR}
            className={
              RESERVATION_EDIT_UNAVAILABLE_BACK_CLASS
            }
          >
            {RESERVATION_EDIT_COPY.BACK_TO_CALENDAR}
          </Link>
          <Title
            id={RESERVATION_FORM_FIELD_ID.HEADING}
            variant={TitleVariant.PRIMARY}
            text={RESERVATION_EDIT_COPY.UNAVAILABLE_TITLE}
            className={RESERVATION_FORM_TITLE_CLASS}
          />
        </header>
        <div className={RESERVATION_FORM_CARD_CLASS}>
          <Text
            role={ARIA_ROLE.STATUS}
            className={RESERVATION_FORM_STATUS_CLASS}
          >
            {RESERVATION_EDIT_COPY.UNAVAILABLE_DESCRIPTION}
          </Text>
          <Link
            href={PATHS.RESERVATIONS.CALENDAR}
            className={
              RESERVATION_EDIT_UNAVAILABLE_ACTION_CLASS
            }
          >
            {RESERVATION_EDIT_COPY.BACK_TO_CALENDAR}
          </Link>
        </div>
      </div>
    </main>
  );

export default ReservationEditUnavailable;
