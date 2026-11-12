import { formatReservationCalendarDateTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarDateTime";
import {
  RESERVATION_DETAIL_SECTIONS_COPY as copy,
  RESERVATION_DETAIL_SECTION_ID,
} from "../constants/ReservationDetailSectionsCopy.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import { RESERVATION_DETAIL_AUDIT_CLASS } from "../styles/ReservationDetailSections.styles";
import ReservationDetailAuditRow from "./ReservationDetailAuditRow";
import ReservationDetailPanel from "./ReservationDetailPanel";

const ReservationDetailAuditSection = ({
  detail,
}: ReservationDetailProps): React.JSX.Element => (
  <ReservationDetailPanel
    sectionId={RESERVATION_DETAIL_SECTION_ID.AUDIT}
    title={copy.AUDIT}
  >
    <div className={RESERVATION_DETAIL_AUDIT_CLASS}>
      <ReservationDetailAuditRow
        date={formatReservationCalendarDateTime(
          detail.created_at
        )}
        label={copy.CREATED_BY}
        name={detail.createdByName ?? copy.MISSING_NAME}
      />
      <ReservationDetailAuditRow
        date={formatReservationCalendarDateTime(
          detail.updated_at
        )}
        label={copy.MODIFIED_BY}
        name={detail.updatedByName ?? copy.MISSING_NAME}
      />
    </div>
  </ReservationDetailPanel>
);

export default ReservationDetailAuditSection;
