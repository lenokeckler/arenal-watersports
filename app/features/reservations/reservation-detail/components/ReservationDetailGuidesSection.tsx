import { UnorderedList } from "@/app/components";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import Text from "@/app/components/text/Text";
import { MATERIAL_ICON_NAME } from "@/app/constants";
import {
  RESERVATION_DETAIL_SECTIONS_COPY as copy,
  RESERVATION_DETAIL_SECTION_ID,
} from "../constants/ReservationDetailSectionsCopy.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import {
  RESERVATION_DETAIL_ICON_CLASS,
  RESERVATION_DETAIL_LIST_CLASS,
  RESERVATION_DETAIL_ROW_CLASS,
  RESERVATION_DETAIL_ROW_MAIN_CLASS,
  RESERVATION_DETAIL_ROW_TITLE_CLASS,
} from "../styles/ReservationDetailSections.styles";
import ReservationDetailCollectionSection from "./ReservationDetailCollectionSection";

const ReservationDetailGuidesSection = ({
  detail,
}: ReservationDetailProps): React.JSX.Element => (
  <ReservationDetailCollectionSection
    sectionId={RESERVATION_DETAIL_SECTION_ID.GUIDES}
    title={copy.GUIDES}
    emptyMessage={copy.MISSING_GUIDES}
    isEmpty={detail.guides.length === 0}
  >
    <UnorderedList
      className={RESERVATION_DETAIL_LIST_CLASS}
      items={detail.guides.map((guide) => ({
        id: guide.workerId,
        text: (
          <div className={RESERVATION_DETAIL_ROW_CLASS}>
            <div
              className={RESERVATION_DETAIL_ROW_MAIN_CLASS}
            >
              <MaterialIcon
                name={MATERIAL_ICON_NAME.SUPPORT_AGENT}
                className={RESERVATION_DETAIL_ICON_CLASS}
              />
              <Text
                className={
                  RESERVATION_DETAIL_ROW_TITLE_CLASS
                }
              >
                {guide.name}
              </Text>
            </div>
          </div>
        ),
      }))}
    />
  </ReservationDetailCollectionSection>
);

export default ReservationDetailGuidesSection;
