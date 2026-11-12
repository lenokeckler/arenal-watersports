import { expect, test } from "@playwright/test";
import {
  E2E_UNIT_CONCURRENCY,
  E2E_UNIT_CONCURRENCY_MESSAGE,
} from "../constants/E2eUnitConcurrency.constants";
import { buildUnitConcurrencyIds } from "../support/buildUnitConcurrencyIds";
import type { UnitConcurrencyIds } from "../support/models/UnitConcurrencyIds.interface";
import { runPsqlSession } from "../support/runPsqlSession";
import {
  buildAssignDispatchSql,
  buildChangeStatusSql,
  buildCleanupSql,
  buildReadStateSql,
  buildSeedSql,
} from "../support/unitConcurrencySql";

const wait = (milliseconds: number): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );

const readState = async (
  ids: UnitConcurrencyIds
): Promise<string> =>
  (
    await runPsqlSession(buildReadStateSql(ids))
  ).stdout.trim();

const startSecondSession = async (
  secondSql: string
): ReturnType<typeof runPsqlSession> => {
  await wait(
    E2E_UNIT_CONCURRENCY.SECOND_SESSION_DELAY_MILLISECONDS
  );

  return runPsqlSession(secondSql);
};

test.describe("Unit status and dispatch assignment concurrency", () => {
  let ids: UnitConcurrencyIds;

  test.beforeEach(async () => {
    const { parallelIndex, project } = test.info();
    ids = buildUnitConcurrencyIds(
      `${project.name}-${parallelIndex}`
    );
    const seeded = await runPsqlSession(buildSeedSql(ids));
    expect(seeded.exitCode).toBe(0);
  });

  test.afterEach(async () => {
    await runPsqlSession(buildCleanupSql(ids));
  });

  test("a status change that holds the unit first refuses the dispatch assignment", async () => {
    const [first, second] = await Promise.all([
      runPsqlSession(
        buildChangeStatusSql(
          ids,
          E2E_UNIT_CONCURRENCY.HOLD_SECONDS
        )
      ),
      startSecondSession(buildAssignDispatchSql(ids, 0)),
    ]);

    expect(first.exitCode).toBe(0);
    expect(second.exitCode).not.toBe(0);
    expect(second.stderr).toContain(
      E2E_UNIT_CONCURRENCY_MESSAGE.NOT_AVAILABLE
    );
    expect(second.durationMilliseconds).toBeGreaterThan(
      E2E_UNIT_CONCURRENCY.MINIMUM_WAIT_MILLISECONDS
    );
    expect(await readState(ids)).toBe(
      "in_maintenance|none"
    );
  });

  test("a dispatch assignment that holds the unit first refuses the status change", async () => {
    const [first, second] = await Promise.all([
      runPsqlSession(
        buildAssignDispatchSql(
          ids,
          E2E_UNIT_CONCURRENCY.HOLD_SECONDS
        )
      ),
      startSecondSession(buildChangeStatusSql(ids, 0)),
    ]);

    expect(first.exitCode).toBe(0);
    expect(second.exitCode).not.toBe(0);
    expect(second.stderr).toContain(
      E2E_UNIT_CONCURRENCY_MESSAGE.OCCUPIED
    );
    expect(second.durationMilliseconds).toBeGreaterThan(
      E2E_UNIT_CONCURRENCY.MINIMUM_WAIT_MILLISECONDS
    );
    expect(await readState(ids)).toBe(
      `available|${ids.dispatchId}`
    );
  });
});
