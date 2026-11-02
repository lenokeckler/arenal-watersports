import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import {
  RESERVATION_DETAIL_AUDIT_COLUMN_CLASS,
  RESERVATION_DETAIL_PRIMARY_COLUMN_CLASS,
  RESERVATION_DETAIL_SECONDARY_COLUMN_CLASS,
  RESERVATION_DETAIL_SECTIONS_GRID_CLASS,
} from "../styles/ReservationDetailSections.styles";
import ReservationDetailAuditSection from "./ReservationDetailAuditSection";
import ReservationDetailDispatchSection from "./ReservationDetailDispatchSection";
import ReservationDetailEquipmentSection from "./ReservationDetailEquipmentSection";
import ReservationDetailExtrasSection from "./ReservationDetailExtrasSection";
import ReservationDetailGuidesSection from "./ReservationDetailGuidesSection";

const ReservationDetailSections = ({
  detail,
}: ReservationDetailProps): React.JSX.Element => (
  <div className={RESERVATION_DETAIL_SECTIONS_GRID_CLASS}>
    <div
      className={RESERVATION_DETAIL_PRIMARY_COLUMN_CLASS}
    >
      <ReservationDetailDispatchSection detail={detail} />
      <ReservationDetailEquipmentSection detail={detail} />
    </div>
    <div
      className={RESERVATION_DETAIL_SECONDARY_COLUMN_CLASS}
    >
      <ReservationDetailExtrasSection detail={detail} />
      <ReservationDetailGuidesSection detail={detail} />
    </div>
    <div className={RESERVATION_DETAIL_AUDIT_COLUMN_CLASS}>
      <ReservationDetailAuditSection detail={detail} />
    </div>
  </div>
);

export default ReservationDetailSections;
