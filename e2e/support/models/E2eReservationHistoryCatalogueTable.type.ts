import type { E2E_SUPABASE_TABLE } from "../../constants/E2eSupabase.constants";

export type E2eReservationHistoryCatalogueTable =
  | typeof E2E_SUPABASE_TABLE.EQUIPMENT_CATEGORIES
  | typeof E2E_SUPABASE_TABLE.EQUIPMENT_UNITS
  | typeof E2E_SUPABASE_TABLE.EXTRAS;
