import type { PostgrestError } from "@supabase/supabase-js";
import type { NullableRef } from "@/app/types";

export interface DepositsRangeResponse<Row> {
  count: NullableRef<number>;
  data: NullableRef<Row[]>;
  error: NullableRef<PostgrestError>;
}
