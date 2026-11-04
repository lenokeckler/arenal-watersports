import Text from "@/app/components/text/Text";
import type { ReservationDetailCollectionSectionProps } from "../models/ReservationDetailCollectionSectionProps.interface";
import { RESERVATION_DETAIL_EMPTY_CLASS } from "../styles/ReservationDetailSections.styles";
import ReservationDetailPanel from "./ReservationDetailPanel";

const ReservationDetailCollectionSection = ({
  children,
  emptyMessage,
  isEmpty,
  sectionId,
  title,
}: ReservationDetailCollectionSectionProps): React.JSX.Element => (
  <ReservationDetailPanel
    sectionId={sectionId}
    title={title}
  >
    {isEmpty ? (
      <Text className={RESERVATION_DETAIL_EMPTY_CLASS}>
        {emptyMessage}
      </Text>
    ) : (
      children
    )}
  </ReservationDetailPanel>
);

export default ReservationDetailCollectionSection;
