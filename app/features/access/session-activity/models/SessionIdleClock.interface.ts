import type { NullableRef } from "@/app/types";

export interface SessionIdleClock {
  keepWorking: () => Promise<void>;
  sync: () => Promise<void>;
  warningSeconds: NullableRef<number>;
}
