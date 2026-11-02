import type { ReservationDetailProps } from "./models/ReservationDetailProps.interface";
import {
  RESERVATION_DETAIL_CONTENT_CLASS,
  RESERVATION_DETAIL_PAGE_CLASS,
  RESERVATION_DETAIL_PAGE_GLOW_CLASS,
} from "./styles/ReservationDetail.styles";
import ReservationDetailHeader from "./components/ReservationDetailHeader";
import ReservationDetailOverview from "./components/ReservationDetailOverview";

const ReservationDetailView = ({
  detail,
}: ReservationDetailProps): React.JSX.Element => (
  <main className={RESERVATION_DETAIL_PAGE_CLASS}>
    <div className={RESERVATION_DETAIL_PAGE_GLOW_CLASS} />
    <div className={RESERVATION_DETAIL_CONTENT_CLASS}>
      <ReservationDetailHeader detail={detail} />
      <ReservationDetailOverview detail={detail} />
    </div>
  </main>
);

export default ReservationDetailView;
