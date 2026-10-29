import type { NullableRef } from "@/app/types";

export interface RecoveryAccount {
  address: NullableRef<string>;
  remove: () => Promise<void>;
  username: string;
}
