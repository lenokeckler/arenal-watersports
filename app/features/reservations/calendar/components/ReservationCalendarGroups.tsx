import type { ReactElement } from "react";
import type { NullableRef } from "@/app/types";
import { Text } from "@/app/components";
import {
  ARIA_ROLE,
  CALENDAR_VIEW,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { ReservationCalendarGroupsProps } from "../models/ReservationCalendarGroupsProps.interface";
import { ReservationCalendarGroupList } from "./ReservationCalendarGroupList";
import {
  RESERVATION_CALENDAR_AGENDA_CLASS,
  RESERVATION_CALENDAR_MESSAGES_CLASS,
} from "../styles/ReservationCalendarGroups.styles";

export const ReservationCalendarGroups = ({
  content,
  messages,
  period,
  reserveMobileFabSpace,
}: ReservationCalendarGroupsProps): NullableRef<ReactElement> => {
  const showAgenda =
    period.view === CALENDAR_VIEW.MONTH ||
    period.view === CALENDAR_VIEW.YEAR;
  if (!showAgenda && messages.length === 0) {
    return null;
  }
  return (
    <div
      role={ARIA_ROLE.REGION}
      aria-label={RESERVATIONS_CALENDAR_COPY.PERIOD_AGENDA}
      className={RESERVATION_CALENDAR_AGENDA_CLASS}
    >
      {messages.length > 0 && (
        <div
          className={RESERVATION_CALENDAR_MESSAGES_CLASS}
        >
          {messages.map((message) => (
            <Text key={message}>{message}</Text>
          ))}
        </div>
      )}
      {showAgenda && content.groups.length > 0 && (
        <ReservationCalendarGroupList
          groups={content.groups}
          reserveMobileFabSpace={reserveMobileFabSpace}
        />
      )}
    </div>
  );
};
