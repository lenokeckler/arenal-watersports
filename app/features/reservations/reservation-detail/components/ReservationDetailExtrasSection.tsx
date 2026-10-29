import { UnorderedList } from "@/app/components";
import {
  RESERVATION_DETAIL_SECTIONS_COPY as copy,
  RESERVATION_DETAIL_SECTION_ID,
} from "../constants/ReservationDetailSectionsCopy.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import { RESERVATION_DETAIL_LIST_CLASS } from "../styles/ReservationDetailSections.styles";
import ReservationDetailCollectionSection from "./ReservationDetailCollectionSection";
import ReservationDetailExtraRow from "./ReservationDetailExtraRow";

const ReservationDetailExtrasSection = ({
  detail,
}: ReservationDetailProps): React.JSX.Element => (
  <ReservationDetailCollectionSection
    sectionId={RESERVATION_DETAIL_SECTION_ID.EXTRAS}
    title={copy.EXTRAS}
    emptyMessage={copy.MISSING_EXTRAS}
    isEmpty={detail.extras.length === 0}
  >
    <UnorderedList
      className={RESERVATION_DETAIL_LIST_CLASS}
      items={detail.extras.map((extra, index) => ({
        id: `${extra.name}-${index}`,
        text: <ReservationDetailExtraRow extra={extra} />,
      }))}
    />
  </ReservationDetailCollectionSection>
);

export default ReservationDetailExtrasSection;
