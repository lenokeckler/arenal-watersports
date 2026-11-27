import type { PriceLookupAudienceSection } from "./PriceLookupAudienceSection.interface";
import type { PriceLookupTariffCard } from "./PriceLookupTariffCard.interface";

export interface PriceLookupScreen {
  isEmpty: boolean;
  sections: PriceLookupAudienceSection[];
  tariffCards: PriceLookupTariffCard[];
}
