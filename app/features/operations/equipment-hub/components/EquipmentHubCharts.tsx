import type { EquipmentHubSectionProps } from "../models/EquipmentHubSectionProps.interface";
import { EQUIPMENT_HUB_CHARTS_CLASS } from "../styles/EquipmentHub.styles";
import EquipmentHubCauseChart from "./EquipmentHubCauseChart";
import EquipmentHubSpendChart from "./EquipmentHubSpendChart";
import type { JSX } from "react";

const EquipmentHubCharts = ({
  currency,
  data,
}: EquipmentHubSectionProps): JSX.Element => (
  <div className={EQUIPMENT_HUB_CHARTS_CLASS}>
    <EquipmentHubCauseChart reports={data.reports} />
    <EquipmentHubSpendChart
      currency={currency}
      data={data}
    />
  </div>
);

export default EquipmentHubCharts;
