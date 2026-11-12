import type { PendingDispatchSeed } from "./PendingDispatchSeed.interface";

export interface PendingDispatchFixture {
  remove: () => Promise<void>;
  reservations: PendingDispatchSeed[];
}
