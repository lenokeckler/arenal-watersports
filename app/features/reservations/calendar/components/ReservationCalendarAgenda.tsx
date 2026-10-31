import type { ReactElement } from "react";
import type { NullableUndefined } from "@/app/types";
import { Section, Text } from "@/app/components";
import {
  ARIA_ROLE,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { ReservationCalendarAgendaProps } from "../models/ReservationCalendarAgendaProps.interface";
import { ReservationCalendarGroupList } from "./ReservationCalendarGroupList";
import {
  RESERVATION_CALENDAR_AGENDA_CLASS,
  RESERVATION_CALENDAR_MESSAGES_CLASS,
} from "../styles/ReservationCalendarGroups.styles";

const getAgendaId = (
  label: string
): NullableUndefined<string> => {
  if (
    label === RESERVATIONS_CALENDAR_COPY.SELECTED_DAY_AGENDA
  ) {
    return RESERVATIONS_CALENDAR_COPY.SELECTED_DAY_AGENDA_ID;
  }
  if (
    label ===
    RESERVATIONS_CALENDAR_COPY.SELECTED_MONTH_AGENDA
  ) {
    return RESERVATIONS_CALENDAR_COPY.SELECTED_MONTH_AGENDA_ID;
  }
  return undefined;
};

export const ReservationCalendarAgenda = ({
  agenda,
  label,
  showGroups,
}: ReservationCalendarAgendaProps): ReactElement => (
  <Section
    id={getAgendaId(label)}
    role={ARIA_ROLE.REGION}
    aria-label={label}
    className={RESERVATION_CALENDAR_AGENDA_CLASS}
  >
    {agenda.messages.length > 0 && (
      <div className={RESERVATION_CALENDAR_MESSAGES_CLASS}>
        {agenda.messages.map((message) => (
          <Text key={message}>{message}</Text>
        ))}
      </div>
    )}
    {showGroups && agenda.content.groups.length > 0 && (
      <ReservationCalendarGroupList
        groups={agenda.content.groups}
      />
    )}
  </Section>
);
