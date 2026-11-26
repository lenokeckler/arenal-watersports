import type { PriceLookupContentProps } from "../models/PriceLookupContentProps.interface";
import { PRICE_LOOKUP_AUDIENCES_CLASS } from "../styles/PriceLookup.styles";
import PriceLookupAudienceSection from "./PriceLookupAudienceSection";
import PriceLookupTariffs from "./PriceLookupTariffs";
import type { JSX } from "react";

const PriceLookupContent = ({
  screen,
}: PriceLookupContentProps): JSX.Element => (
  <>
    <PriceLookupTariffs cards={screen.tariffCards} />
    <div className={PRICE_LOOKUP_AUDIENCES_CLASS}>
      {screen.sections.map((section) => (
        <PriceLookupAudienceSection
          key={section.audience}
          section={section}
        />
      ))}
    </div>
  </>
);

export default PriceLookupContent;
