import type { NullableRef } from "@/app/types";

export interface E2eWorkerRecord {
  mustChangePassword: boolean;
  personalEmail: NullableRef<string>;
  username: string;
  workerId: string;
}
