import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { PRICE_LOOKUP_COPY } from "../constants/PriceLookupCopy.constants";
import { PRICE_LOOKUP_HEADING_ID } from "../constants/PriceLookupHeadingId.constants";
import type { PriceLookupTariffsProps } from "../models/PriceLookupTariffsProps.interface";
import {
  PRICE_LOOKUP_MESSAGE_CLASS,
  PRICE_LOOKUP_SECTION_CLASS,
  PRICE_LOOKUP_SECTION_HEADING_CLASS,
} from "../styles/PriceLookup.styles";
import PriceLookupGroup from "./PriceLookupGroup";
import type { JSX } from "react";

const PriceLookupTariffs = ({
  cards,
}: PriceLookupTariffsProps): JSX.Element => (
  <Section
    ariaLabel={PRICE_LOOKUP_HEADING_ID.TARIFFS}
    className={PRICE_LOOKUP_SECTION_CLASS}
  >
    <Title
      id={PRICE_LOOKUP_HEADING_ID.TARIFFS}
      variant={TitleVariant.SECONDARY}
      text={PRICE_LOOKUP_COPY.TARIFFS_HEADING}
      className={PRICE_LOOKUP_SECTION_HEADING_CLASS}
    />
    {cards.length === 0 && (
      <Text className={PRICE_LOOKUP_MESSAGE_CLASS}>
        {PRICE_LOOKUP_COPY.TARIFFS_EMPTY}
      </Text>
    )}
    {cards.map((card) => (
      <PriceLookupGroup
        key={card.id}
        emptyMessage={PRICE_LOOKUP_COPY.TARIFFS_EMPTY}
        headingId={`${PRICE_LOOKUP_HEADING_ID.TARIFF_CARD_PREFIX}${card.id}`}
        rows={card.rows}
        title={card.title}
      />
    ))}
  </Section>
);

export default PriceLookupTariffs;
