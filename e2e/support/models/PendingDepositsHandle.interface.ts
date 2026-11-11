import type { PendingDepositsFixture } from "./PendingDepositsFixture.interface";

export interface PendingDepositsHandle {
  fixture: PendingDepositsFixture;
  remove: () => Promise<void>;
}
