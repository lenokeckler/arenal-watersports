import type { MaintenanceAgendaEntryProps } from "./MaintenanceAgendaEntryProps.interface";

export type MaintenanceAgendaBodyProps = Omit<
  MaintenanceAgendaEntryProps,
  "href"
>;
