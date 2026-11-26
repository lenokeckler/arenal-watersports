import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { PRICE_LOOKUP_ERROR } from "../constants/PriceLookupError.constants";
import type { PriceLookupCatalog } from "../models/PriceLookupCatalog.interface";
import { mapPriceLookupComboRow } from "../utils/mapPriceLookupComboRow";
import { mapPriceLookupExtraRow } from "../utils/mapPriceLookupExtraRow";
import { mapPriceLookupTariffRow } from "../utils/mapPriceLookupTariffRow";
import { buildPriceLookupComboQuery } from "./buildPriceLookupComboQuery";
import { buildPriceLookupExtraQuery } from "./buildPriceLookupExtraQuery";
import { buildPriceLookupTariffQuery } from "./buildPriceLookupTariffQuery";

export const getPriceLookupCatalog =
  async (): Promise<PriceLookupCatalog> => {
    const supabase = await getOperationsSupabaseClient();

    const [tariffs, extras, combos] = await Promise.all([
      buildPriceLookupTariffQuery(supabase),
      buildPriceLookupExtraQuery(supabase),
      buildPriceLookupComboQuery(supabase),
    ]);
    throwIfSupabaseError(
      tariffs.error,
      PRICE_LOOKUP_ERROR.LOAD_TARIFFS
    );
    throwIfSupabaseError(
      extras.error,
      PRICE_LOOKUP_ERROR.LOAD_EXTRAS
    );
    throwIfSupabaseError(
      combos.error,
      PRICE_LOOKUP_ERROR.LOAD_COMBOS
    );

    return {
      combos: (combos.data ?? []).map(
        mapPriceLookupComboRow
      ),
      extras: (extras.data ?? []).map(
        mapPriceLookupExtraRow
      ),
      tariffs: (tariffs.data ?? []).map(
        mapPriceLookupTariffRow
      ),
    };
  };
