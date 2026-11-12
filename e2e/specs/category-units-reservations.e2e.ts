import { expect } from "@playwright/test";
import { RESERVATION_STATUS } from "@/app/constants";
import { UNIT_RESERVATION_STATUS_LABEL } from "@/app/features/administration/unit-catalog/constants/UnitReservationStatusLabel.constants";
import { UNIT_STATUS } from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";
import { resolveUnitEditPath } from "@/app/features/administration/unit-catalog/utils/resolveUnitPaths";
import { test } from "../support/categoryUnitsTest";
import {
  decommissionSeededUnit,
  readUnit,
} from "../support/unitFixtures";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import {
  E2E_UNIT_RESERVATION_ORDER,
  E2E_UNIT_RESERVATION_SEED_INDEX,
  E2E_UNIT_RESERVATION_SCENARIO,
  E2E_UNIT_RESERVATION_SEEDS,
} from "../constants/E2eUnitReservationHistory.constants";

const SCHEDULED_LABEL =
  UNIT_RESERVATION_STATUS_LABEL[
    RESERVATION_STATUS.SCHEDULED
  ];

test.describe("Category unit reservations", () => {
  test("lists the reservations of a unit with the latest start first", async ({
    formPage,
    seedUnitCategory,
    seedUnitReservations,
  }) => {
    const {
      categoryId,
      codes: [code],
    } = await seedUnitCategory(
      E2E_UNIT_RESERVATION_SCENARIO.LISTED,
      {},
      [UNIT_STATUS.AVAILABLE]
    );
    const { id: unitId } = await readUnit(code);
    const [oldest, newest] = await seedUnitReservations(
      unitId,
      E2E_UNIT_RESERVATION_SEEDS
    );

    await formPage.goTo(categoryId, unitId);

    await expect(formPage.getReservationRows()).toHaveCount(
      E2E_UNIT_RESERVATION_SEEDS.length
    );
    const rows = formPage.getReservationRows();
    const newestRow = rows.nth(
      E2E_UNIT_RESERVATION_ORDER.NEWEST
    );
    const oldestRow = rows.nth(
      E2E_UNIT_RESERVATION_ORDER.OLDEST
    );
    await expect(newestRow).toContainText(newest.code);
    await expect(newestRow).toContainText(
      newest.customerName
    );
    await expect(newestRow).toContainText(SCHEDULED_LABEL);
    await expect(oldestRow).toContainText(oldest.code);
    await expect(oldestRow).toContainText(
      oldest.customerName
    );
  });

  test("says the unit has no reservations when it has none", async ({
    formPage,
    seedUnitCategory,
  }) => {
    const {
      categoryId,
      codes: [code],
    } = await seedUnitCategory(
      E2E_UNIT_RESERVATION_SCENARIO.EMPTY,
      {},
      [UNIT_STATUS.AVAILABLE]
    );
    const { id: unitId } = await readUnit(code);

    await formPage.goTo(categoryId, unitId);

    await expect(
      formPage.getReservationHistoryEmptyState()
    ).toBeVisible();
    await expect(formPage.getReservationRows()).toHaveCount(
      E2E_COUNT.NONE
    );
  });

  test("keeps the history of a decommissioned unit reachable from its card", async ({
    page,
    formPage,
    listPage,
    seedUnitCategory,
    seedUnitReservations,
  }) => {
    const {
      categoryId,
      codes: [code],
    } = await seedUnitCategory(
      E2E_UNIT_RESERVATION_SCENARIO.DECOMMISSIONED,
      {},
      [UNIT_STATUS.AVAILABLE]
    );
    const { id: unitId } = await readUnit(code);
    const [record] = await seedUnitReservations(unitId, [
      E2E_UNIT_RESERVATION_SEEDS[
        E2E_UNIT_RESERVATION_SEED_INDEX.NEWEST
      ],
    ]);
    await decommissionSeededUnit(code);

    await listPage.goTo(categoryId);
    await expect(listPage.getEditLink(code)).toHaveCount(
      E2E_COUNT.NONE
    );
    await listPage.getHistoryLink(code).click();

    await expect(page).toHaveURL(
      resolveUnitEditPath(categoryId, unitId)
    );
    await expect(
      formPage.getDecommissionedNotice()
    ).toBeVisible();
    await expect(formPage.getReservationRows()).toHaveCount(
      E2E_COUNT.ONE
    );
    await expect(
      formPage.getReservationRows().first()
    ).toContainText(record.code);
  });
});
