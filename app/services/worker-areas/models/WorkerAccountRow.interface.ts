import type { Database } from "@/app/types/Database";
import type { NullableRef } from "@/app/types";

export interface WorkerAccountRow {
  blocked_reason: NullableRef<
    Database["public"]["Enums"]["worker_blocked_reason"]
  >;
  deleted_at: NullableRef<string>;
}
