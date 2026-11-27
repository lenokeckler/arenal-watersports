import LinkSheet from "@/app/components/link-sheet/LinkSheet";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceAttentionSheetProps } from "../models/MaintenanceAttentionSheetProps.interface";
import MaintenanceAttentionGroup from "./MaintenanceAttentionGroup";
import type { JSX } from "react";

const MaintenanceAttentionSheet = ({
  closeHref,
  oil,
  out,
  title,
}: MaintenanceAttentionSheetProps): JSX.Element => (
  <LinkSheet
    closeHref={closeHref}
    title={title}
  >
    <MaintenanceAttentionGroup
      heading={MAINTENANCE_COPY.ATTEND_OIL}
      units={oil}
    />
    <MaintenanceAttentionGroup
      heading={MAINTENANCE_COPY.ATTEND_OUT}
      units={out}
    />
  </LinkSheet>
);

export default MaintenanceAttentionSheet;
