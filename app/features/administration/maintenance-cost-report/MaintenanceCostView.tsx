import UnorderedList from "@/app/components/list/UnorderedList";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import MaintenanceCostCard from "./components/MaintenanceCostCard";
import {
  MAINTENANCE_COST_COPY,
  MAINTENANCE_COST_HEADING_ID,
} from "./constants/MaintenanceCostReportCopy.constants";
import type { MaintenanceCostViewProps } from "./models/MaintenanceCostViewProps.interface";
import {
  MAINTENANCE_COST_CLASS,
  MAINTENANCE_COST_HEADING_CLASS,
  MAINTENANCE_COST_LIST_CLASS,
  MAINTENANCE_COST_MESSAGE_CLASS,
} from "./styles/MaintenanceCostReport.styles";
import type { JSX } from "react";

const MaintenanceCostView = ({
  costs,
  errorMessage,
}: MaintenanceCostViewProps): JSX.Element => (
  <main className={MAINTENANCE_COST_CLASS}>
    <Title
      id={MAINTENANCE_COST_HEADING_ID}
      variant={TitleVariant.PRIMARY}
      text={MAINTENANCE_COST_COPY.HEADING}
      className={MAINTENANCE_COST_HEADING_CLASS}
    />
    {errorMessage && (
      <Text
        className={MAINTENANCE_COST_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    )}
    {!errorMessage && costs.length === 0 && (
      <Text className={MAINTENANCE_COST_MESSAGE_CLASS}>
        {MAINTENANCE_COST_COPY.EMPTY}
      </Text>
    )}
    {!errorMessage && costs.length > 0 && (
      <UnorderedList
        className={MAINTENANCE_COST_LIST_CLASS}
        items={costs.map((cost) => ({
          id: cost.unitId,
          text: <MaintenanceCostCard cost={cost} />,
        }))}
      />
    )}
  </main>
);

export default MaintenanceCostView;
