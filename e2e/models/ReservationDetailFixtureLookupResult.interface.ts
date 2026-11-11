import type { PostgrestError } from "@supabase/supabase-js";
import type { NullableRef } from "@/app/types";

export interface ReservationDetailFixtureLookupResult<
  Value,
> {
  data: NullableRef<Value>;
  error: NullableRef<PostgrestError>;
}
