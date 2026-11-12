import Button from "@/app/components/button/Button";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationCategoryAvailabilityRetryActionProps } from "../models/ReservationCategoryAvailabilityRetryActionProps.interface";
import { RESERVATION_CATEGORY_AVAILABILITY_RETRY_CLASS } from "../styles/ReservationCategoryAvailabilityPanel.styles";

const ReservationCategoryAvailabilityRetryAction = ({
  onRetry,
}: ReservationCategoryAvailabilityRetryActionProps): React.JSX.Element => (
  <Button
    className={
      RESERVATION_CATEGORY_AVAILABILITY_RETRY_CLASS
    }
    onClick={onRetry}
    type="button"
  >
    {RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY_RETRY}
  </Button>
);

export default ReservationCategoryAvailabilityRetryAction;
