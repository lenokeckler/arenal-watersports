import Section from "@/app/components/section/Section";
import SectionTitle from "@/app/components/section-title/SectionTitle";
import Text from "@/app/components/text/Text";
import type { ComboAudienceSectionProps } from "../models/ComboAudienceSectionProps.interface";
import {
  COMBO_LIST_CARDS_CLASS,
  COMBO_LIST_EMPTY_CLASS,
  COMBO_LIST_SECTION_CLASS,
  COMBO_LIST_SECTION_HEADER_CLASS,
  COMBO_LIST_SECTION_NOTE_CLASS,
  COMBO_LIST_SECTION_TITLE_CLASS,
} from "../styles/ComboList.styles";
import ComboCard from "./ComboCard";

const ComboAudienceSection = ({
  cards,
  emptyMessage,
  priceNote,
  title,
}: ComboAudienceSectionProps): React.JSX.Element => (
  <Section className={COMBO_LIST_SECTION_CLASS}>
    <div className={COMBO_LIST_SECTION_HEADER_CLASS}>
      <SectionTitle
        text={title}
        className={COMBO_LIST_SECTION_TITLE_CLASS}
      />
      <Text className={COMBO_LIST_SECTION_NOTE_CLASS}>
        {priceNote}
      </Text>
    </div>
    {cards.length > 0 ? (
      <div className={COMBO_LIST_CARDS_CLASS}>
        {cards.map((card) => (
          <ComboCard
            key={card.id}
            {...card}
          />
        ))}
      </div>
    ) : (
      <Text className={COMBO_LIST_EMPTY_CLASS}>
        {emptyMessage}
      </Text>
    )}
  </Section>
);

export default ComboAudienceSection;
