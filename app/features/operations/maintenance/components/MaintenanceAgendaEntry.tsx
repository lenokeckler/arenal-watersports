import Link from "@/app/components/link/Link";
import type { MaintenanceAgendaEntryProps } from "../models/MaintenanceAgendaEntryProps.interface";
import {
  AGENDA_ENTRY_CLASS,
  AGENDA_STATIC_ENTRY_CLASS,
} from "../styles/MaintenanceCalendar.styles";
import MaintenanceAgendaBody from "./MaintenanceAgendaBody";
import type { JSX } from "react";

const MaintenanceAgendaEntry = ({
  href,
  ...body
}: MaintenanceAgendaEntryProps): JSX.Element =>
  href ? (
    <Link
      href={href}
      className={AGENDA_ENTRY_CLASS}
    >
      <MaintenanceAgendaBody {...body} />
    </Link>
  ) : (
    <article className={AGENDA_STATIC_ENTRY_CLASS}>
      <MaintenanceAgendaBody {...body} />
    </article>
  );

export default MaintenanceAgendaEntry;
