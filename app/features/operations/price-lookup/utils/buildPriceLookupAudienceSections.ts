import { PRICE_LOOKUP_AMOUNT_FIELD } from "../constants/PriceLookupAmountField.constants";
import { PRICE_LOOKUP_AUDIENCE_HEADING } from "../constants/PriceLookupAudienceCopy.constants";
import {
  PRICE_LOOKUP_AUDIENCE_CURRENCY,
  PRICE_LOOKUP_AUDIENCE_ORDER,
} from "../constants/PriceLookupAudienceCurrency.constants";
import type { PriceLookupAudience } from "../models/PriceLookupAudience.type";
import type { PriceLookupAudienceSection } from "../models/PriceLookupAudienceSection.interface";
import type { PriceLookupAudienceSources } from "../models/PriceLookupAudienceSources.interface";
import type { PriceLookupRow } from "../models/PriceLookupRow.interface";
import { buildPriceLookupAmountLine } from "./buildPriceLookupAmountLine";
import { formatPriceLookupComboItems } from "./formatPriceLookupComboItems";

const buildExtraRows = (
  { extras }: PriceLookupAudienceSources,
  audience: PriceLookupAudience
): PriceLookupRow[] => {
  const currency = PRICE_LOOKUP_AUDIENCE_CURRENCY[audience];
  return extras.flatMap((extra) => {
    const amount =
      extra.amounts[PRICE_LOOKUP_AMOUNT_FIELD[currency]];
    return amount === null
      ? []
      : [
          {
            amounts: [
              buildPriceLookupAmountLine(currency, amount),
            ],
            detail: null,
            id: extra.id,
            label: extra.name,
          },
        ];
  });
};

const buildComboRows = (
  { combos }: PriceLookupAudienceSources,
  audience: PriceLookupAudience
): PriceLookupRow[] => {
  const currency = PRICE_LOOKUP_AUDIENCE_CURRENCY[audience];
  return combos
    .filter((combo) => combo.audience === audience)
    .flatMap((combo) =>
      combo.packagePrice === null
        ? []
        : [
            {
              amounts: [
                buildPriceLookupAmountLine(
                  currency,
                  combo.packagePrice
                ),
              ],
              detail: formatPriceLookupComboItems(
                combo.items
              ),
              id: combo.id,
              label: combo.name,
            },
          ]
    );
};

export const buildPriceLookupAudienceSections = (
  sources: PriceLookupAudienceSources
): PriceLookupAudienceSection[] =>
  PRICE_LOOKUP_AUDIENCE_ORDER.map((audience) => ({
    audience,
    combos: buildComboRows(sources, audience),
    extras: buildExtraRows(sources, audience),
    heading: PRICE_LOOKUP_AUDIENCE_HEADING[audience],
  }));
