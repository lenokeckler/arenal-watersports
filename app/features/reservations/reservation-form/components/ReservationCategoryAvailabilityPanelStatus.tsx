import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE } from "../constants/ReservationCategoryAvailabilityPanelState.constants";
import type { ReservationCategoryAvailabilityPanelStatusProps } from "../models/ReservationCategoryAvailabilityPanelStatusProps.interface";
import {
  RESERVATION_CATEGORY_AVAILABILITY_COUNT_CLASS,
  resolveAvailabilityPanelStatusClass,
} from "../styles/ReservationCategoryAvailabilityPanel.styles";
import { getReservationCategoryAvailabilityStatusCopy } from "../utils/getReservationCategoryAvailabilityStatusCopy";
import ReservationCategoryAvailabilityRetryAction from "./ReservationCategoryAvailabilityRetryAction";

const ReservationCategoryAvailabilityPanelStatus = ({
  freeEquipmentCount,
  onRetry,
  state,
}: ReservationCategoryAvailabilityPanelStatusProps): React.JSX.Element => {
  const isError =
    state ===
    RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.ERROR;
  const isLoading =
    state ===
    RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.LOADING;
  const statusCopy =
    getReservationCategoryAvailabilityStatusCopy(state);

  return (
    <div
      className={resolveAvailabilityPanelStatusClass(state)}
      role={isError ? ARIA_ROLE.ALERT : ARIA_ROLE.STATUS}
    >
      {freeEquipmentCount !== null && !isLoading ? (
        <Text
          bold
          className={
            RESERVATION_CATEGORY_AVAILABILITY_COUNT_CLASS
          }
        >
          {freeEquipmentCount}{" "}
          {
            RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY_AVAILABLE
          }
        </Text>
      ) : null}
      {statusCopy ? <Text>{statusCopy}</Text> : null}
      {isError ? (
        <ReservationCategoryAvailabilityRetryAction
          onRetry={onRetry}
        />
      ) : null}
    </div>
  );
};

export default ReservationCategoryAvailabilityPanelStatus;
