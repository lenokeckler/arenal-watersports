import type { ReservationFormCardProps } from "../models/ReservationFormCardProps.interface";
import ReservationEquipmentEligibilityFeedback from "./ReservationEquipmentEligibilityFeedback";
import ReservationSubmissionFeedback from "./ReservationSubmissionFeedback";

const ReservationFormFeedback = (
  props: ReservationFormCardProps
): React.JSX.Element => (
  <>
    <ReservationEquipmentEligibilityFeedback {...props} />
    <ReservationSubmissionFeedback {...props} />
  </>
);

export default ReservationFormFeedback;
