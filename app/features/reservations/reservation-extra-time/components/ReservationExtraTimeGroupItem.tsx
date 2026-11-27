import { InlineText } from "@/app/components";
import { RESERVATION_EXTRA_TIME_NO_MINUTES } from "../constants/ReservationExtraTimeUi.constants";
import { RESERVATION_EXTRA_TIME_UI_COPY as COPY } from "../constants/ReservationExtraTimeUiCopy.constants";
import type { ReservationExtraTimeGroupItemProps } from "../models/ReservationExtraTimeGroupItemProps.interface";
import {
  RESERVATION_EXTRA_TIME_DEFINITION_CLASS,
  RESERVATION_EXTRA_TIME_GROUP_CLASS,
  RESERVATION_EXTRA_TIME_GROUP_HEAD_CLASS,
  RESERVATION_EXTRA_TIME_GROUP_MINUTES_CLASS,
  RESERVATION_EXTRA_TIME_GROUP_NAME_CLASS,
  RESERVATION_EXTRA_TIME_SOURCE_BADGE_CLASS,
  RESERVATION_EXTRA_TIME_TERM_CLASS,
  RESERVATION_EXTRA_TIME_TIMES_CLASS,
} from "../styles/ReservationExtraTime.styles";
import { formatReservationExtraTimeClock } from "../utils/formatReservationExtraTimeClock";
import { formatReservationExtraTimeMinutes } from "../utils/formatReservationExtraTimeMinutes";

const ReservationExtraTimeGroupItem = ({
  group,
}: ReservationExtraTimeGroupItemProps): React.JSX.Element => {
  const times = [
    [COPY.DEPARTED, group.dispatchedAt],
    [COPY.PLANNED_RETURN, group.plannedReturnsAt],
    [COPY.ARRIVED, group.arrivedAt],
  ] as const;

  return (
    <li className={RESERVATION_EXTRA_TIME_GROUP_CLASS}>
      <div
        className={RESERVATION_EXTRA_TIME_GROUP_HEAD_CLASS}
      >
        <InlineText
          className={
            RESERVATION_EXTRA_TIME_GROUP_NAME_CLASS
          }
        >
          {group.categoryName}
        </InlineText>
        <InlineText
          className={
            RESERVATION_EXTRA_TIME_GROUP_MINUTES_CLASS
          }
        >
          {COPY.EXTRA_MINUTES(
            formatReservationExtraTimeMinutes(
              group.extraMinutes
            )
          )}
        </InlineText>
      </div>
      <InlineText
        className={
          RESERVATION_EXTRA_TIME_SOURCE_BADGE_CLASS[
            group.source
          ]
        }
      >
        {group.extendedMinutes >
        RESERVATION_EXTRA_TIME_NO_MINUTES
          ? COPY.EXTENDED_BY(
              formatReservationExtraTimeMinutes(
                group.extendedMinutes
              )
            )
          : COPY.SOURCE[group.source]}
      </InlineText>
      <dl className={RESERVATION_EXTRA_TIME_TIMES_CLASS}>
        {times.map(([label, instant]) => (
          <div key={label}>
            <dt
              className={RESERVATION_EXTRA_TIME_TERM_CLASS}
            >
              {label}
            </dt>
            <dd
              className={
                RESERVATION_EXTRA_TIME_DEFINITION_CLASS
              }
            >
              {formatReservationExtraTimeClock(instant)}
            </dd>
          </div>
        ))}
      </dl>
    </li>
  );
};

export default ReservationExtraTimeGroupItem;
