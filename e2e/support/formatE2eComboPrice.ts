import { COMBO_AUDIENCE_CURRENCY } from "@/app/features/administration/combo-catalog/constants/ComboAudienceCurrency.constants";
import type { ComboAudience } from "@/app/features/administration/combo-catalog/models/ComboAudience.type";
import { formatMoney } from "@/app/utils/money/formatMoney";

export const formatE2eComboPrice = (
  audience: ComboAudience,
  amount: number
): string =>
  formatMoney({
    amount,
    currency: COMBO_AUDIENCE_CURRENCY[audience],
  });
