import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { UNIT_RESERVATION_HISTORY_COPY } from "../constants/UnitReservationHistoryCopy.constants";
import type { UnitReservationHistoryErrorStateProps } from "../models/UnitReservationHistoryErrorStateProps.interface";
import {
  UNIT_LIST_STATE_BUTTON_CLASS,
  UNIT_LIST_STATE_ERROR_BODY_CLASS,
  UNIT_LIST_STATE_WRAPPER_CLASS,
} from "../styles/UnitListStates.styles";

const UnitReservationHistoryErrorState = ({
  onRetry,
}: UnitReservationHistoryErrorStateProps): React.JSX.Element => (
  <div className={UNIT_LIST_STATE_WRAPPER_CLASS}>
    <Text className={UNIT_LIST_STATE_ERROR_BODY_CLASS}>
      {UNIT_RESERVATION_HISTORY_COPY.FETCH_ERROR_MESSAGE}
    </Text>
    <Button
      variant={BUTTON.SECONDARY}
      onClick={onRetry}
      className={UNIT_LIST_STATE_BUTTON_CLASS}
    >
      {UNIT_RESERVATION_HISTORY_COPY.RETRY_BUTTON}
    </Button>
  </div>
);

export default UnitReservationHistoryErrorState;
