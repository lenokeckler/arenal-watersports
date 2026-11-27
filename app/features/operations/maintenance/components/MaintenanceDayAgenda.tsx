import Text from "@/app/components/text/Text";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceSectionProps } from "../models/MaintenanceSectionProps.interface";
import { buildDayTotals } from "../utils/buildDayTotals";
import { buildAgendaItems } from "../utils/buildAgendaItems";
import { matchesDayEntry } from "../utils/matchesDayEntry";
import { resolveAgendaTotalsClass } from "../styles/MaintenanceCalendar.styles";
import MaintenanceAgendaEntry from "./MaintenanceAgendaEntry";
import MaintenanceAgendaLinks from "./MaintenanceAgendaLinks";
import type { JSX } from "react";

const MaintenanceDayAgenda = ({
  data,
  filters,
}: MaintenanceSectionProps): JSX.Element => {
  const jobs = data.calendar.jobs.filter((job) =>
    matchesDayEntry(job, filters)
  );
  const reports = data.calendar.reports.filter((report) =>
    matchesDayEntry(report, filters)
  );
  const isEmpty = jobs.length + reports.length === 0;

  return (
    <>
      <Text className={resolveAgendaTotalsClass(isEmpty)}>
        {isEmpty
          ? MAINTENANCE_COPY.DAY_EMPTY
          : buildDayTotals(jobs, reports.length)}
      </Text>
      {buildAgendaItems(jobs, reports).map(
        ({ entry, id }) => (
          <MaintenanceAgendaEntry
            key={id}
            {...entry}
          />
        )
      )}
      <MaintenanceAgendaLinks
        data={data}
        filters={filters}
      />
    </>
  );
};

export default MaintenanceDayAgenda;
