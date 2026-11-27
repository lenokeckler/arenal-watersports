import type { NullableRef } from "@/app/types";
import { parseMoneyAmount } from "@/app/utils/money/parseMoneyAmount";
import type { SaveTariffAmountsInput } from "../models/SaveTariffAmountsInput.type";
import type { SaveTariffsInput } from "../models/SaveTariffsInput.type";
import type { TariffFormValues } from "../models/TariffFormValues.interface";
import type { TariffTypeFormValues } from "../models/TariffTypeFormValues.interface";
import { isTariffTypeFormBlank } from "./isTariffTypeFormBlank";

const mapTypeValuesToAmounts = (
  values: TariffTypeFormValues
): NullableRef<SaveTariffAmountsInput> =>
  isTariffTypeFormBlank(values)
    ? null
    : {
        crc: parseMoneyAmount(values.crcText),
        usd: parseMoneyAmount(values.usdText),
      };

export const mapTariffFormValuesToPayload = (
  categoryId: string,
  values: TariffFormValues
): SaveTariffsInput => ({
  category_id: categoryId,
  rental: mapTypeValuesToAmounts(values.rental),
  tour: mapTypeValuesToAmounts(values.tour),
});
