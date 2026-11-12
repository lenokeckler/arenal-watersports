import type { ReactElement } from "react";
import { InlineText, Link } from "@/app/components";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS } from "@/app/constants";
import { EXTERNAL_GUIDE_CALENDAR_COPY } from "../constants/ExternalGuideCalendarCopy.constants";
import {
  RESERVATION_CALENDAR_CREATE_ICON_CLASS,
  RESERVATION_CALENDAR_CREATE_LABEL_CLASS,
  RESERVATION_CALENDAR_CREATE_LINK_CLASS,
} from "../styles/ReservationCalendarCreateLink.styles";

export const ExternalGuideRegistrationLink =
  (): ReactElement => (
    <Link
      href={PATHS.RESERVATIONS.EXTERNAL_GUIDE_NEW}
      className={RESERVATION_CALENDAR_CREATE_LINK_CLASS}
    >
      <div
        aria-hidden
        className={RESERVATION_CALENDAR_CREATE_ICON_CLASS}
      >
        <MaterialIcon
          name={MATERIAL_ICON_NAME.PERSON_ADD}
        />
      </div>
      <InlineText
        className={RESERVATION_CALENDAR_CREATE_LABEL_CLASS}
      >
        {EXTERNAL_GUIDE_CALENDAR_COPY.CREATE_LINK}
      </InlineText>
    </Link>
  );
