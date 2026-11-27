import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import InlineText from "@/app/components/text/InlineText";
import type { MaintenanceAgendaBodyProps } from "../models/MaintenanceAgendaBodyProps.type";
import {
  AGENDA_ENTRY_BODY_CLASS,
  AGENDA_ENTRY_TEXT_CLASS,
  AGENDA_ENTRY_TITLE_CLASS,
} from "../styles/MaintenanceCalendar.styles";
import { MAINTENANCE_HINT_CLASS } from "../styles/Maintenance.styles";
import type { JSX } from "react";

const MaintenanceAgendaBody = ({
  description,
  detail,
  icon,
  markClassName,
  title,
}: MaintenanceAgendaBodyProps): JSX.Element => (
  <>
    <MaterialIcon
      name={icon}
      className={markClassName}
    />
    <InlineText className={AGENDA_ENTRY_BODY_CLASS}>
      <InlineText className={AGENDA_ENTRY_TITLE_CLASS}>
        {title}
      </InlineText>
      {description && (
        <InlineText className={AGENDA_ENTRY_TEXT_CLASS}>
          {description}
        </InlineText>
      )}
      {detail && (
        <InlineText className={MAINTENANCE_HINT_CLASS}>
          {detail}
        </InlineText>
      )}
    </InlineText>
  </>
);

export default MaintenanceAgendaBody;
