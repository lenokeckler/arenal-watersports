import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE } from "../constants/ReservationCategoryAvailabilityPanelState.constants";
import type { ReservationCategoryAvailabilityPanelProps } from "../models/ReservationCategoryAvailabilityPanelProps.interface";
import { RESERVATION_CATEGORY_AVAILABILITY_PANEL_CLASS } from "../styles/ReservationCategoryAvailabilityPanel.styles";
import ReservationCategoryAvailabilityPanelContext from "./ReservationCategoryAvailabilityPanelContext";
import ReservationCategoryAvailabilityPanelStatus from "./ReservationCategoryAvailabilityPanelStatus";

const ReservationCategoryAvailabilityPanel = ({
  categoryName,
  freeEquipmentCount,
  intervalLabel,
  onRetry,
  state,
}: ReservationCategoryAvailabilityPanelProps): React.JSX.Element | null => {
  if (
    state ===
    RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.INACTIVE
  ) {
    return null;
  }

  return (
    <div
      aria-label={
        RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY
      }
      className={
        RESERVATION_CATEGORY_AVAILABILITY_PANEL_CLASS
      }
      role={ARIA_ROLE.REGION}
    >
      <ReservationCategoryAvailabilityPanelContext
        categoryName={categoryName}
        intervalLabel={intervalLabel}
      />
      <ReservationCategoryAvailabilityPanelStatus
        freeEquipmentCount={freeEquipmentCount}
        onRetry={onRetry}
        state={state}
      />
    </div>
  );
};

export default ReservationCategoryAvailabilityPanel;
