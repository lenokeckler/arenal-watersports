import { formatMoney } from "@/app/utils/money/formatMoney";
import { COMBO_AUDIENCE_CURRENCY } from "../constants/ComboAudienceCurrency.constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import type { Combo } from "../models/Combo.interface";
import type { ComboCardActions } from "../models/ComboCardActions.interface";
import type { ComboCardViewModel } from "../models/ComboCardViewModel.interface";
import { resolveComboEditPath } from "./resolveComboEditPath";

const buildItemsSummary = ({ items }: Combo): string =>
  items.length > 0
    ? items
        .map(
          ({ categoryName, quantity }) =>
            `${quantity.toString()} ${categoryName}`
        )
        .join(COMBO_CATALOG_COPY.ITEM_SEPARATOR)
    : COMBO_CATALOG_COPY.NO_ITEMS;

const buildPriceLabel = ({
  audience,
  packagePrice,
}: Combo): string =>
  packagePrice === null
    ? COMBO_CATALOG_COPY.NO_PRICE
    : formatMoney({
        amount: packagePrice,
        currency: COMBO_AUDIENCE_CURRENCY[audience],
      });

export const buildComboCardViewModel = (
  combo: Combo,
  actions: ComboCardActions
): ComboCardViewModel => ({
  editHref: resolveComboEditPath(combo.id),
  id: combo.id,
  isActionLoading: actions.pendingComboId === combo.id,
  itemsSummary: buildItemsSummary(combo),
  name: combo.name,
  onReactivateClick: actions.onReactivateClick(combo.id),
  onRemoveClick: actions.onRemoveClick(combo),
  priceLabel: buildPriceLabel(combo),
  status: combo.status,
});
