import { parseMoneyAmount } from "@/app/utils/money/parseMoneyAmount";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { CreateExtraInput } from "../models/CreateExtraInput.interface";
import type { ExtraPriceColumns } from "../models/ExtraPriceColumns.type";

export const mapExtraInputToPriceColumns = (
  input: CreateExtraInput
): ExtraPriceColumns => ({
  price_usd: parseMoneyAmount(safeString(input.priceUsd)),
  price_crc: parseMoneyAmount(safeString(input.priceCrc)),
});
