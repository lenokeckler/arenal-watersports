import type { NullableRef } from "@/app/types";
import type { TariffAmounts } from "../models/TariffAmounts.interface";

export const hasTariffAmounts = (
  amounts: NullableRef<TariffAmounts>
): boolean =>
  amounts !== null &&
  (amounts.crc !== null || amounts.usd !== null);
