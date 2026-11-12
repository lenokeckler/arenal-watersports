import { Link, Text } from "@/app/components";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_FORM_COPY } from "../constants/ReservationPostponementFormCopy.constants";
import { RESERVATION_POSTPONEMENT_UI_COPY } from "../constants/ReservationPostponementUiCopy.constants";
import type { ReservationPostponementSuccessProps } from "../models/ReservationPostponementSuccessProps.interface";
import { RESERVATION_POSTPONEMENT_SUCCESS_CLASS } from "../styles/ReservationPostponementForm.styles";
import { RESERVATION_POSTPONEMENT_CALENDAR_LINK_CLASS } from "../styles/ReservationPostponementLayout.styles";
import { formatReservationPostponementDate } from "../utils/formatReservationPostponementDate";

const ReservationPostponementSuccess = ({
  date,
  time,
}: ReservationPostponementSuccessProps): React.JSX.Element => (
  <div className={RESERVATION_POSTPONEMENT_SUCCESS_CLASS}>
    <Text role={ARIA_ROLE.STATUS}>
      {RESERVATION_POSTPONEMENT_FORM_COPY.SUCCESS(
        formatReservationPostponementDate(date),
        time
      )}
    </Text>
    <Link
      href={PATHS.RESERVATIONS.CALENDAR}
      className={
        RESERVATION_POSTPONEMENT_CALENDAR_LINK_CLASS
      }
    >
      {RESERVATION_POSTPONEMENT_UI_COPY.BACK_TO_CALENDAR}
    </Link>
  </div>
);

export default ReservationPostponementSuccess;
