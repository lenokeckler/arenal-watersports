import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import MaintenanceJobForm from "./components/MaintenanceJobForm";
import { MAINTENANCE_JOB_COPY } from "./constants/MaintenanceJobCopy.constants";
import type { MaintenanceJobUnit } from "./models/MaintenanceJobUnit.interface";
import { getMaintenanceJobUnits } from "./services/getMaintenanceJobUnits";
import {
  MAINTENANCE_JOB_ERROR_CLASS,
  MAINTENANCE_JOB_HEADING_CLASS,
  MAINTENANCE_JOB_PAGE_CLASS,
} from "./styles/MaintenanceJob.styles";
import type { JSX } from "react";

const MaintenanceJob = async (): Promise<JSX.Element> => {
  let units: MaintenanceJobUnit[] = [];
  let errorMessage: string | null = null;

  try {
    units = await getMaintenanceJobUnits();
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? MAINTENANCE_JOB_COPY.FORBIDDEN
        : MAINTENANCE_JOB_COPY.ERROR_LOAD;
  }

  return (
    <main className={MAINTENANCE_JOB_PAGE_CLASS}>
      <Title
        variant={TitleVariant.PRIMARY}
        text={MAINTENANCE_JOB_COPY.HEADING}
        className={MAINTENANCE_JOB_HEADING_CLASS}
      />
      {errorMessage ? (
        <Text
          className={MAINTENANCE_JOB_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {errorMessage}
        </Text>
      ) : (
        <MaintenanceJobForm units={units} />
      )}
    </main>
  );
};

export default MaintenanceJob;
