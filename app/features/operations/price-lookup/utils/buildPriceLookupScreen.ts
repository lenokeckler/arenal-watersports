import type { PriceLookupCatalog } from "../models/PriceLookupCatalog.interface";
import type { PriceLookupScreen } from "../models/PriceLookupScreen.interface";
import { buildPriceLookupAudienceSections } from "./buildPriceLookupAudienceSections";
import { buildPriceLookupTariffCards } from "./buildPriceLookupTariffCards";

export const buildPriceLookupScreen = (
  catalog: PriceLookupCatalog
): PriceLookupScreen => {
  const tariffCards = buildPriceLookupTariffCards(
    catalog.tariffs
  );
  const sections =
    buildPriceLookupAudienceSections(catalog);
  const hasSectionRows = sections.some(
    (section) =>
      section.extras.length > 0 || section.combos.length > 0
  );

  return {
    isEmpty: tariffCards.length === 0 && !hasSectionRows,
    sections,
    tariffCards,
  };
};
