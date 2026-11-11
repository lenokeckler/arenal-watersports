import {
  ARIA_ROLE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import Link from "@/app/components/link/Link";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import MaintenanceOilSection from "./components/MaintenanceOilSection";
import MaintenanceServiceSection from "./components/MaintenanceServiceSection";
import {
  MAINTENANCE_COPY,
  MAINTENANCE_HEADING_ID,
} from "./constants/MaintenanceCopy.constants";
import type { MaintenanceViewProps } from "./models/MaintenanceViewProps.interface";
import {
  MAINTENANCE_CLASS,
  MAINTENANCE_HEADING_CLASS,
  MAINTENANCE_MESSAGE_CLASS,
  MAINTENANCE_NEW_JOB_LINK_CLASS,
} from "./styles/Maintenance.styles";
import type { JSX } from "react";

const MaintenanceView = ({
  errorMessage,
  overview,
}: MaintenanceViewProps): JSX.Element => (
  <main className={MAINTENANCE_CLASS}>
    <Title
      id={MAINTENANCE_HEADING_ID}
      variant={TitleVariant.PRIMARY}
      text={MAINTENANCE_COPY.HEADING}
      className={MAINTENANCE_HEADING_CLASS}
    />
    <Link
      href={PATHS.OPERATIONS.MAINTENANCE_NEW}
      className={MAINTENANCE_NEW_JOB_LINK_CLASS}
    >
      {MAINTENANCE_COPY.NEW_JOB}
    </Link>
    <Link
      href={PATHS.OPERATIONS.MAINTENANCE_HISTORY}
      className={MAINTENANCE_NEW_JOB_LINK_CLASS}
    >
      {MAINTENANCE_COPY.HISTORY}
    </Link>
    {errorMessage ? (
      <Text
        className={MAINTENANCE_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    ) : (
      <>
        <MaintenanceOilSection units={overview.oilDue} />
        <MaintenanceServiceSection
          units={overview.outOfService}
        />
      </>
    )}
  </main>
);

export default MaintenanceView;
