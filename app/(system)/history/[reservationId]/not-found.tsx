import { PATHS } from "@/app/constants";
import ReservationHistoryNotFound from "@/app/features/board/reservation-history/components/ReservationHistoryNotFound";

const ReservationHistoryRouteNotFound =
  (): React.JSX.Element => (
    <ReservationHistoryNotFound
      backHref={PATHS.HISTORY.ROOT}
    />
  );

export default ReservationHistoryRouteNotFound;
