import Text from "@/app/components/text/Text";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceSectionProps } from "../models/MaintenanceSectionProps.interface";
import { buildAttentionList } from "../utils/buildAttentionList";
import { MAINTENANCE_HINT_CLASS } from "../styles/Maintenance.styles";
import MaintenanceAttentionAlert from "./MaintenanceAttentionAlert";
import type { JSX } from "react";

const MaintenanceAttention = ({
  data,
  filters,
}: MaintenanceSectionProps): JSX.Element => {
  const waiting = buildAttentionList(data.overview);

  return waiting.length === 0 ? (
    <Text className={MAINTENANCE_HINT_CLASS}>
      {MAINTENANCE_COPY.ATTEND_EMPTY}
    </Text>
  ) : (
    <MaintenanceAttentionAlert
      filters={filters}
      waiting={waiting}
    />
  );
};

export default MaintenanceAttention;
