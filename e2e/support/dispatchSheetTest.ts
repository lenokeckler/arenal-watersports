import { test as base } from "./activeWorkerTest";
import { createDispatchSheetFixture } from "./createDispatchSheetFixture";
import type { DispatchSheetFixture } from "./models/DispatchSheetFixture.interface";

export const test = base.extend<{
  boardDispatchSheet: DispatchSheetFixture;
  boardMotorDispatchSheet: DispatchSheetFixture;
  dispatchSheet: DispatchSheetFixture;
  motorDispatchSheet: DispatchSheetFixture;
}>({
  boardDispatchSheet: async ({ activeWorker }, provide) => {
    const fixture = await createDispatchSheetFixture(
      activeWorker.id,
      { isOnBoard: true }
    );

    await provide(fixture);
    await fixture.remove();
  },
  boardMotorDispatchSheet: async (
    { activeWorker },
    provide
  ) => {
    const fixture = await createDispatchSheetFixture(
      activeWorker.id,
      { hasMotor: true, isOnBoard: true }
    );

    await provide(fixture);
    await fixture.remove();
  },
  dispatchSheet: async ({ activeWorker }, provide) => {
    const fixture = await createDispatchSheetFixture(
      activeWorker.id
    );

    await provide(fixture);
    await fixture.remove();
  },
  motorDispatchSheet: async ({ activeWorker }, provide) => {
    const fixture = await createDispatchSheetFixture(
      activeWorker.id,
      { hasMotor: true }
    );

    await provide(fixture);
    await fixture.remove();
  },
});

export { expect } from "./activeWorkerTest";
