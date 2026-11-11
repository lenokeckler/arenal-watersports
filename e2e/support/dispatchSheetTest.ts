import { test as base } from "./activeWorkerTest";
import { createDispatchSheetFixture } from "./createDispatchSheetFixture";
import type { DispatchSheetFixture } from "./models/DispatchSheetFixture.interface";

export const test = base.extend<{
  dispatchSheet: DispatchSheetFixture;
}>({
  dispatchSheet: async ({ activeWorker }, provide) => {
    const fixture = await createDispatchSheetFixture(
      activeWorker.id
    );

    await provide(fixture);
    await fixture.remove();
  },
});

export { expect } from "./activeWorkerTest";
