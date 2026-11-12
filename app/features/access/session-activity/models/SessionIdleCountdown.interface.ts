import type { NullableRef } from "@/app/types";

export interface SessionIdleCountdown {
  schedule: (secondsLeft: number) => void;
  stop: () => void;
  warningSeconds: NullableRef<number>;
}
