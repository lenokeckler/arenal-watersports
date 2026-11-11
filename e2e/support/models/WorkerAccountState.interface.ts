import type { Database, NullableRef } from "@/app/types";

export interface WorkerAccountState {
  blockedReason: NullableRef<
    Database["public"]["Enums"]["worker_blocked_reason"]
  >;
  failedAttempts: number;
  mustChangePassword: boolean;
  status: Database["public"]["Enums"]["worker_status"];
}
