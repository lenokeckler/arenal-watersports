import { UnorderedList } from "@/app/components";
import {
  RESERVATION_DETAIL_SECTIONS_COPY as copy,
  RESERVATION_DETAIL_SECTION_ID,
} from "../constants/ReservationDetailSectionsCopy.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import { RESERVATION_DETAIL_LIST_CLASS } from "../styles/ReservationDetailSections.styles";
import ReservationDetailCollectionSection from "./ReservationDetailCollectionSection";
import ReservationDetailEquipmentRow from "./ReservationDetailEquipmentRow";

const ReservationDetailEquipmentSection = ({
  detail,
}: ReservationDetailProps): React.JSX.Element => (
  <ReservationDetailCollectionSection
    sectionId={RESERVATION_DETAIL_SECTION_ID.EQUIPMENT}
    title={copy.EQUIPMENT}
    emptyMessage={copy.MISSING_EQUIPMENT}
    isEmpty={detail.equipment.length === 0}
  >
    <UnorderedList
      className={RESERVATION_DETAIL_LIST_CLASS}
      items={detail.equipment.map((equipment, index) => ({
        id: `${equipment.unitCode ?? equipment.categoryName}-${index}`,
        text: (
          <ReservationDetailEquipmentRow
            equipment={equipment}
          />
        ),
      }))}
    />
  </ReservationDetailCollectionSection>
);

export default ReservationDetailEquipmentSection;
