import type { PostgrestError } from "@supabase/supabase-js";
import type { NullableRef } from "@/app/types";

export interface ReservationDetailFixtureDeleteResult {
  error: NullableRef<PostgrestError>;
}
