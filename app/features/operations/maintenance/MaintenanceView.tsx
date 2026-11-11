import { ARIA_ROLE, TitleVariant } from "@/app/constants";
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
