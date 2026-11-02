import { SUPABASE_WORKER_MARK } from "@/app/constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import {
  E2E_GENERAL_MANAGER_LABEL,
  E2E_GENERAL_MANAGER_PUT_NOTICE,
  E2E_GENERAL_MANAGER_REMOVED_NOTICE,
  E2E_GUIDE_LABEL,
  E2E_GUIDE_PUT_NOTICE,
  E2E_GUIDE_REMOVED_NOTICE,
} from "../constants/E2eWorkerMarks.constants";
import { E2E_WORKER_AREAS_COPY } from "../constants/E2eWorkerAreas.constants";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { expect, test } from "../support/activeWorkerTest";
import { countWorkerAreas } from "../support/countWorkerAreas";
import { countWorkerMark } from "../support/countWorkerMark";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Worker marks", () => {
  test("administration puts the guide mark on a worker and removes it, with no new role or area", async ({
    activeWorker,
    page,
  }) => {
    const areasPage = createWorkerAreasPage(page);
    await signInAsSeededWorker(page);
    await areasPage.goTo();
    await areasPage.search(activeWorker.username);

    await areasPage.press(
      E2E_GUIDE_LABEL,
      E2E_WORKER_AREAS_COPY.MARK_GRANT
    );
    await expect(
      areasPage.getNotice(E2E_GUIDE_PUT_NOTICE)
    ).toBeVisible();
    await expect(
      areasPage.getMessage(E2E_WORKER_AREAS_COPY.MARK_SET)
    ).toBeVisible();
    expect(
      await countWorkerMark(
        activeWorker.id,
        SUPABASE_WORKER_MARK.GUIDE
      )
    ).toBe(E2E_COUNT.ONE);
    expect(await countWorkerAreas(activeWorker.id)).toBe(
      E2E_COUNT.ONE
    );

    await areasPage.press(
      E2E_GUIDE_LABEL,
      E2E_WORKER_AREAS_COPY.REVOKE
    );
    await expect(
      areasPage.getNotice(E2E_GUIDE_REMOVED_NOTICE)
    ).toBeVisible();
    expect(
      await countWorkerMark(
        activeWorker.id,
        SUPABASE_WORKER_MARK.GUIDE
      )
    ).toBe(E2E_COUNT.NONE);
  });

  test("administration puts the general manager mark on a worker and removes it", async ({
    activeWorker,
    page,
  }) => {
    const areasPage = createWorkerAreasPage(page);
    await signInAsSeededWorker(page);
    await areasPage.goTo();
    await areasPage.search(activeWorker.username);

    await areasPage.press(
      E2E_GENERAL_MANAGER_LABEL,
      E2E_WORKER_AREAS_COPY.MARK_GRANT
    );
    await expect(
      areasPage.getNotice(E2E_GENERAL_MANAGER_PUT_NOTICE)
    ).toBeVisible();
    expect(
      await countWorkerMark(
        activeWorker.id,
        SUPABASE_WORKER_MARK.GENERAL_MANAGER
      )
    ).toBe(E2E_COUNT.ONE);

    await areasPage.press(
      E2E_GENERAL_MANAGER_LABEL,
      E2E_WORKER_AREAS_COPY.REVOKE
    );
    await expect(
      areasPage.getNotice(
        E2E_GENERAL_MANAGER_REMOVED_NOTICE
      )
    ).toBeVisible();
    expect(
      await countWorkerMark(
        activeWorker.id,
        SUPABASE_WORKER_MARK.GENERAL_MANAGER
      )
    ).toBe(E2E_COUNT.NONE);
  });
});
