import type { ReactElement } from "react";
import { InlineText, Link } from "@/app/components";
import {
  PATHS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { RESERVATION_CALENDAR_CREATE_ICON } from "../constants/ReservationCalendarCreate.constants";
import {
  RESERVATION_CALENDAR_CREATE_ICON_CLASS,
  RESERVATION_CALENDAR_CREATE_LABEL_CLASS,
  RESERVATION_CALENDAR_CREATE_LINK_CLASS,
} from "../styles/ReservationCalendarCreateLink.styles";

export const ReservationCalendarCreateLink =
  (): ReactElement => (
    <Link
      href={PATHS.RESERVATIONS.NEW}
      className={RESERVATION_CALENDAR_CREATE_LINK_CLASS}
    >
      <div
        aria-hidden
        className={RESERVATION_CALENDAR_CREATE_ICON_CLASS}
      >
        <MaterialIcon
          name={RESERVATION_CALENDAR_CREATE_ICON.NAME}
        />
      </div>
      <InlineText
        className={RESERVATION_CALENDAR_CREATE_LABEL_CLASS}
      >
        {RESERVATIONS_CALENDAR_COPY.CREATE_RESERVATION}
      </InlineText>
    </Link>
  );
