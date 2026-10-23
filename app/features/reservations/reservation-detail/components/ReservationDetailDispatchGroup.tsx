import Text from "@/app/components/text/Text";
import { formatReservationCalendarDateTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarDateTime";
import { RESERVATION_DETAIL_SECTIONS_COPY as copy } from "../constants/ReservationDetailSectionsCopy.constants";
import type { ReservationDetailDispatchGroupProps } from "../models/ReservationDetailDispatchGroupProps.interface";
import {
  RESERVATION_DETAIL_DISPATCH_CARD_CLASS,
  RESERVATION_DETAIL_EMPTY_CLASS,
  RESERVATION_DETAIL_METRICS_CLASS,
  RESERVATION_DETAIL_ROW_TITLE_CLASS,
} from "../styles/ReservationDetailSections.styles";
import ReservationDetailDispatchTime from "./ReservationDetailDispatchTime";

const ReservationDetailDispatchGroup = ({
  dispatch,
}: ReservationDetailDispatchGroupProps): React.JSX.Element => (
  <div className={RESERVATION_DETAIL_DISPATCH_CARD_CLASS}>
    <Text className={RESERVATION_DETAIL_ROW_TITLE_CLASS}>
      {dispatch.categoryName ?? copy.MISSING_CATEGORY}
    </Text>
    <div className={RESERVATION_DETAIL_METRICS_CLASS}>
      <ReservationDetailDispatchTime
        label={copy.ACTUAL_DEPARTURE}
        value={formatReservationCalendarDateTime(
          dispatch.actualDepartureAt
        )}
      />
      <ReservationDetailDispatchTime
        label={copy.EXPECTED_RETURN}
        value={
          dispatch.expectedReturnAt === null
            ? copy.MISSING_RETURN
            : formatReservationCalendarDateTime(
                dispatch.expectedReturnAt
              )
        }
      />
      {dispatch.actualArrivalAt === null ? (
        <Text className={RESERVATION_DETAIL_EMPTY_CLASS}>
          {copy.MISSING_ARRIVAL}
        </Text>
      ) : (
        <ReservationDetailDispatchTime
          label={copy.ACTUAL_ARRIVAL}
          value={formatReservationCalendarDateTime(
            dispatch.actualArrivalAt
          )}
        />
      )}
    </div>
  </div>
);

export default ReservationDetailDispatchGroup;
