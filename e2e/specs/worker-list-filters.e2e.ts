import { test } from "@playwright/test";
import {
  PAGINATION,
  SUPABASE_WORK_AREA,
  WORKER_LIST_STATUS,
} from "@/app/constants";
import { WORKER_LIST_COPY } from "@/app/features/administration/worker-list/constants/WorkerListCopy.constants";
import { createWorkerListPage } from "../pages/WorkerList.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { createWorkerListFilterFixture } from "../support/createWorkerListFilterFixture";
import type { WorkerListFilterFixture } from "../support/models/WorkerListFilterFixture.interface";
import { E2E_PROJECT } from "../constants/E2eRuntime.constants";
import { E2E_WORKER_LIST_FILTER_GUIDE_STATUS } from "../constants/E2eWorkerListFilters.constants";

test.describe("Worker list filters", () => {
  let fixture: WorkerListFilterFixture;

  test.beforeAll(async () => {
    fixture = await createWorkerListFilterFixture();
  });

  test.afterAll(async () => {
    await fixture?.remove();
  });

  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== E2E_PROJECT.MOBILE);
    await logInAsAdmin(page);
  });

  test("resets a non-default page when applying role and status filters", async ({
    page,
  }) => {
    const workerListPage = createWorkerListPage(page);

    await workerListPage.goToPage(PAGINATION.ONE_PAGE);
    await workerListPage.applyFilters(
      SUPABASE_WORK_AREA.OPERATIONS,
      WORKER_LIST_STATUS.ACTIVE
    );
    await workerListPage.expectWorkerContainsText(
      fixture.activeGuide.fullName,
      WORKER_LIST_COPY.TEMPORARY_GUIDE_ACTIVE
    );
    await workerListPage.expectWorkerAbsent(
      fixture.expiredGuide.fullName
    );
    await workerListPage.expectWorkerAbsent(
      fixture.reservationsWorker.fullName
    );
    await workerListPage.expectFilterState(
      SUPABASE_WORK_AREA.OPERATIONS,
      WORKER_LIST_STATUS.ACTIVE
    );
    await workerListPage.expectPageParameterAbsent();
  });

  test("includes expired external guides in the inactive status filter", async ({
    page,
  }) => {
    const workerListPage = createWorkerListPage(page);

    await workerListPage.goTo();
    await workerListPage.applyFilters(
      SUPABASE_WORK_AREA.OPERATIONS,
      WORKER_LIST_STATUS.INACTIVE
    );
    await workerListPage.expectWorkerContainsText(
      fixture.expiredGuide.fullName,
      E2E_WORKER_LIST_FILTER_GUIDE_STATUS.INACTIVE
    );
    await workerListPage.expectWorkerAbsent(
      fixture.activeGuide.fullName
    );
    await workerListPage.expectWorkerAbsent(
      fixture.reservationsWorker.fullName
    );
    await workerListPage.expectFilterState(
      SUPABASE_WORK_AREA.OPERATIONS,
      WORKER_LIST_STATUS.INACTIVE
    );
  });

  test("filters active reservations workers by their base role", async ({
    page,
  }) => {
    const workerListPage = createWorkerListPage(page);

    await workerListPage.goTo();
    await workerListPage.applyFilters(
      SUPABASE_WORK_AREA.RESERVATIONS,
      WORKER_LIST_STATUS.ACTIVE
    );
    await workerListPage.expectWorkerVisible(
      fixture.reservationsWorker.fullName
    );
    await workerListPage.expectWorkerAbsent(
      fixture.activeGuide.fullName
    );
    await workerListPage.expectFilterState(
      SUPABASE_WORK_AREA.RESERVATIONS,
      WORKER_LIST_STATUS.ACTIVE
    );
  });
});
