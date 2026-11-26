import Section from "@/app/components/section/Section";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { PRICE_LOOKUP_COPY } from "../constants/PriceLookupCopy.constants";
import { PRICE_LOOKUP_HEADING_ID } from "../constants/PriceLookupHeadingId.constants";
import type { PriceLookupAudienceSectionProps } from "../models/PriceLookupAudienceSectionProps.interface";
import {
  PRICE_LOOKUP_SECTION_CLASS,
  PRICE_LOOKUP_SECTION_HEADING_CLASS,
} from "../styles/PriceLookup.styles";
import PriceLookupGroup from "./PriceLookupGroup";
import type { JSX } from "react";

const PriceLookupAudienceSection = ({
  section,
}: PriceLookupAudienceSectionProps): JSX.Element => {
  const headingId = `${PRICE_LOOKUP_HEADING_ID.AUDIENCE_PREFIX}${section.audience}`;

  return (
    <Section
      ariaLabel={headingId}
      className={PRICE_LOOKUP_SECTION_CLASS}
    >
      <Title
        id={headingId}
        variant={TitleVariant.SECONDARY}
        text={section.heading}
        className={PRICE_LOOKUP_SECTION_HEADING_CLASS}
      />
      <PriceLookupGroup
        emptyMessage={PRICE_LOOKUP_COPY.EXTRAS_EMPTY}
        headingId={`${headingId}${PRICE_LOOKUP_HEADING_ID.EXTRAS_SUFFIX}`}
        rows={section.extras}
        title={PRICE_LOOKUP_COPY.EXTRAS_HEADING}
      />
      <PriceLookupGroup
        emptyMessage={PRICE_LOOKUP_COPY.COMBOS_EMPTY}
        headingId={`${headingId}${PRICE_LOOKUP_HEADING_ID.COMBOS_SUFFIX}`}
        rows={section.combos}
        title={PRICE_LOOKUP_COPY.COMBOS_HEADING}
      />
    </Section>
  );
};

export default PriceLookupAudienceSection;
