import ScreenBack from "@/app/components/screen-back/ScreenBack";
import Text from "@/app/components/text/Text";
import ScreenHeading from "@/app/components/screen-heading/ScreenHeading";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import MaintenanceContent from "./components/MaintenanceContent";
import {
  MAINTENANCE_COPY,
  MAINTENANCE_HEADING_ID,
} from "./constants/MaintenanceCopy.constants";
import type { MaintenanceViewProps } from "./models/MaintenanceViewProps.interface";
import {
  MAINTENANCE_CLASS,
  MAINTENANCE_MESSAGE_CLASS,
} from "./styles/Maintenance.styles";
import type { JSX } from "react";

const MaintenanceView = ({
  data,
  errorMessage,
  filters,
}: MaintenanceViewProps): JSX.Element => (
  <main className={MAINTENANCE_CLASS}>
    <ScreenBack fallbackHref={PATHS.OPERATIONS.EQUIPMENT} />
    <ScreenHeading
      id={MAINTENANCE_HEADING_ID}
      title={MAINTENANCE_COPY.HEADING}
      action={{
        href: PATHS.OPERATIONS.MAINTENANCE_NEW,
        label: MAINTENANCE_COPY.NEW_JOB,
      }}
    />
    {errorMessage ? (
      <Text
        className={MAINTENANCE_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    ) : (
      <MaintenanceContent
        data={data}
        filters={filters}
      />
    )}
  </main>
);

export default MaintenanceView;
