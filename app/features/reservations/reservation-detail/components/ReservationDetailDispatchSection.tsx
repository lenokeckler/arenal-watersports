import { UnorderedList } from "@/app/components";
import {
  RESERVATION_DETAIL_SECTIONS_COPY as copy,
  RESERVATION_DETAIL_SECTION_ID,
} from "../constants/ReservationDetailSectionsCopy.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import { RESERVATION_DETAIL_LIST_CLASS } from "../styles/ReservationDetailSections.styles";
import ReservationDetailCollectionSection from "./ReservationDetailCollectionSection";
import ReservationDetailDispatchGroup from "./ReservationDetailDispatchGroup";

const ReservationDetailDispatchSection = ({
  detail,
}: ReservationDetailProps): React.JSX.Element => (
  <ReservationDetailCollectionSection
    sectionId={RESERVATION_DETAIL_SECTION_ID.DISPATCHES}
    title={copy.DISPATCHES}
    emptyMessage={copy.MISSING_DISPATCHES}
    isEmpty={detail.dispatches.length === 0}
  >
    <UnorderedList
      className={RESERVATION_DETAIL_LIST_CLASS}
      items={detail.dispatches.map((dispatch) => ({
        id: dispatch.id,
        text: (
          <ReservationDetailDispatchGroup
            dispatch={dispatch}
          />
        ),
      }))}
    />
  </ReservationDetailCollectionSection>
);

export default ReservationDetailDispatchSection;
