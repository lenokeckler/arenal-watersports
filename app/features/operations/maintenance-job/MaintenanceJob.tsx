import ScreenBack from "@/app/components/screen-back/ScreenBack";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ARIA_ROLE,
  TitleVariant,
  PATHS,
} from "@/app/constants";
import { isString } from "@/app/utils/type-guards/isString";
import MaintenanceJobForm from "./components/MaintenanceJobForm";
import { MAINTENANCE_JOB_COPY } from "./constants/MaintenanceJobCopy.constants";
import type { MaintenanceJobProps } from "./models/MaintenanceJobProps.interface";
import { loadMaintenanceJobUnits } from "./services/loadMaintenanceJobUnits";
import { resolveInitialUnitId } from "./utils/resolveInitialUnitId";
import {
  MAINTENANCE_JOB_ERROR_CLASS,
  MAINTENANCE_JOB_HEADING_CLASS,
  MAINTENANCE_JOB_PAGE_CLASS,
} from "./styles/MaintenanceJob.styles";
import type { JSX } from "react";

const MaintenanceJob = async ({
  dateParam,
  unitParam,
}: MaintenanceJobProps = {}): Promise<JSX.Element> => {
  const { errorMessage, units } =
    await loadMaintenanceJobUnits();

  return (
    <main className={MAINTENANCE_JOB_PAGE_CLASS}>
      <ScreenBack
        fallbackHref={PATHS.OPERATIONS.MAINTENANCE}
      />
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
        <MaintenanceJobForm
          initialDate={
            isString(dateParam) ? dateParam : undefined
          }
          initialUnitId={resolveInitialUnitId(unitParam)}
          units={units}
        />
      )}
    </main>
  );
};

export default MaintenanceJob;
