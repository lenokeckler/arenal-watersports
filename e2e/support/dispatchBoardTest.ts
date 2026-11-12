import { test as base } from "./activeWorkerTest";
import { createPendingDispatchFixture } from "./createPendingDispatchFixture";
import { E2E_DISPATCH_SEED_COUNT } from "../constants/E2eDispatchBoard.constants";
import type { PendingDispatchFixture } from "./models/PendingDispatchFixture.interface";

export const test = base.extend<{
  pendingDispatch: PendingDispatchFixture;
  pendingDispatchCount: number;
}>({
  pendingDispatch: async (
    { activeWorker, pendingDispatchCount },
    provide
  ) => {
    const fixture = await createPendingDispatchFixture(
      activeWorker.id,
      pendingDispatchCount
    );

    await provide(fixture);
    await fixture.remove();
  },
  pendingDispatchCount: [
    E2E_DISPATCH_SEED_COUNT.ONE,
    { option: true },
  ],
});

export { expect } from "./activeWorkerTest";
