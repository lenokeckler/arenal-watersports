import { Button } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { useReservationHistoryRetryViewModel } from "../hooks/useReservationHistoryRetryViewModel";
import type { ReservationHistoryResetProps } from "../models/ReservationHistoryResetProps.interface";
import { RESERVATION_HISTORY_RETRY_CLASS } from "../styles/ReservationHistoryState.styles";

const ReservationHistoryRetryButton = ({
  reset,
}: ReservationHistoryResetProps): React.JSX.Element => {
  const { handleRetry } =
    useReservationHistoryRetryViewModel({ reset });

  return (
    <Button
      variant={BUTTON.SECONDARY}
      className={RESERVATION_HISTORY_RETRY_CLASS}
      onClick={handleRetry}
    >
      {RESERVATION_HISTORY_COPY.RETRY}
    </Button>
  );
};

export default ReservationHistoryRetryButton;
