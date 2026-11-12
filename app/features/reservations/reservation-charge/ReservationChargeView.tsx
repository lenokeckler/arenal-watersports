import ReservationChargeLayout from "./components/ReservationChargeLayout";
import ReservationChargeSummary from "./components/ReservationChargeSummary";
import type { ReservationChargeViewProps } from "./models/ReservationChargeViewProps.interface";

const ReservationChargeView = ({
  charge,
}: ReservationChargeViewProps): React.JSX.Element => (
  <ReservationChargeLayout reservationId={charge.id}>
    <ReservationChargeSummary charge={charge} />
  </ReservationChargeLayout>
);

export default ReservationChargeView;
