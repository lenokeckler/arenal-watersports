import type { NullableRef } from "@/app/types";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { TariffAmounts } from "../models/TariffAmounts.interface";
import type { TariffForEdit } from "../models/TariffForEdit.type";
import type { TariffFormValues } from "../models/TariffFormValues.interface";
import type { TariffTypeFormValues } from "../models/TariffTypeFormValues.interface";

const mapAmountsToTypeValues = (
  amounts: NullableRef<TariffAmounts>
): TariffTypeFormValues => ({
  crcText: safeString(amounts?.crc?.toString()),
  usdText: safeString(amounts?.usd?.toString()),
});

export const mapTariffsToFormValues = ({
  rental,
  tour,
}: TariffForEdit): TariffFormValues => ({
  rental: mapAmountsToTypeValues(rental),
  tour: mapAmountsToTypeValues(tour),
});
