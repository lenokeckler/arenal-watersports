import AlertStrip from "@/app/components/alert-strip/AlertStrip";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceAttentionAlertProps } from "../models/MaintenanceAttentionAlertProps.interface";
import { buildMaintenanceHref } from "../utils/buildMaintenanceHref";
import MaintenanceAttentionSheet from "./MaintenanceAttentionSheet";
import type { JSX } from "react";

const MaintenanceAttentionAlert = ({
  filters,
  waiting,
}: MaintenanceAttentionAlertProps): JSX.Element => {
  const oil = waiting.filter((unit) => unit.oilWarning);
  const out = waiting.filter((unit) => !unit.oilWarning);
  const heading = MAINTENANCE_COPY.ATTEND_HEADING(
    waiting.length
  );

  return (
    <>
      <AlertStrip
        actionLabel={MAINTENANCE_COPY.ATTEND_OPEN}
        detail={MAINTENANCE_COPY.ATTEND_DETAIL(
          oil.length,
          out.length
        )}
        href={buildMaintenanceHref(filters, {
          showAttention: true,
        })}
        replace
        title={heading}
      />
      {filters.showAttention && (
        <MaintenanceAttentionSheet
          closeHref={buildMaintenanceHref(filters)}
          oil={oil}
          out={out}
          title={heading}
        />
      )}
    </>
  );
};

export default MaintenanceAttentionAlert;
