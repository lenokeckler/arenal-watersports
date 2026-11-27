import Link from "@/app/components/link/Link";
import { PATHS } from "@/app/constants";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceSectionProps } from "../models/MaintenanceSectionProps.interface";
import { buildRegisterHref } from "../utils/buildRegisterHref";
import { AGENDA_LINK_CLASS } from "../styles/MaintenanceCalendar.styles";
import type { JSX } from "react";

const MaintenanceAgendaLinks = ({
  data,
  filters,
}: MaintenanceSectionProps): JSX.Element => {
  const machine = data.machines.find(
    (item) => item.id === filters.machineId
  );

  return (
    <>
      <Link
        href={buildRegisterHref(
          filters.day,
          filters.machineId
        )}
        className={AGENDA_LINK_CLASS}
      >
        {MAINTENANCE_COPY.REGISTER_ON_DAY}
      </Link>
      {machine && (
        <Link
          href={PATHS.OPERATIONS.UNIT_HISTORY(machine.id)}
          className={AGENDA_LINK_CLASS}
        >
          {MAINTENANCE_COPY.MACHINE_HISTORY(machine.code)}
        </Link>
      )}
    </>
  );
};

export default MaintenanceAgendaLinks;
