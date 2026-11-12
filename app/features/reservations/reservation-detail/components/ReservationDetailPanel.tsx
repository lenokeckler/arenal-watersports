import Section from "@/app/components/section/Section";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import type { ReservationDetailPanelProps } from "../models/ReservationDetailPanelProps.interface";
import {
  RESERVATION_DETAIL_SECTION_CLASS,
  RESERVATION_DETAIL_SECTION_HEADING_CLASS,
} from "../styles/ReservationDetailSections.styles";

const ReservationDetailPanel = ({
  children,
  sectionId,
  title,
}: ReservationDetailPanelProps): React.JSX.Element => (
  <Section
    ariaLabel={sectionId}
    className={RESERVATION_DETAIL_SECTION_CLASS}
  >
    <Title
      id={sectionId}
      variant={TitleVariant.SECONDARY}
      text={title}
      className={RESERVATION_DETAIL_SECTION_HEADING_CLASS}
    />
    {children}
  </Section>
);

export default ReservationDetailPanel;
