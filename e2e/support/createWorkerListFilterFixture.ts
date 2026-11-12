import { SUPABASE_WORK_AREA } from "@/app/constants";
import {
  E2E_WORKER_LIST_FILTER_GUIDES,
  E2E_WORKER_LIST_FILTER_RESERVATIONS_WORKER,
} from "../constants/E2eWorkerListFilters.constants";
import type { WorkerListFilterFixture } from "./models/WorkerListFilterFixture.interface";
import type { WorkerListFilterFixtureWorker } from "./models/WorkerListFilterFixtureWorker.interface";
import { createWorkerListFilterFixtureWorker } from "./createWorkerListFilterFixtureWorker";

const removeWorkers = async (
  workers: readonly WorkerListFilterFixtureWorker[]
): Promise<void> => {
  await Promise.all(workers.map(({ remove }) => remove()));
};

const createActiveGuide = () =>
  createWorkerListFilterFixtureWorker({
    baseRole: SUPABASE_WORK_AREA.OPERATIONS,
    expiresAt:
      E2E_WORKER_LIST_FILTER_GUIDES.ACTIVE.EXPIRES_AT,
    fullName:
      E2E_WORKER_LIST_FILTER_GUIDES.ACTIVE.FULL_NAME,
    isExternalGuide: true,
    mark: E2E_WORKER_LIST_FILTER_GUIDES.MARK,
  });

const createExpiredGuide = () =>
  createWorkerListFilterFixtureWorker({
    baseRole: SUPABASE_WORK_AREA.OPERATIONS,
    expiresAt:
      E2E_WORKER_LIST_FILTER_GUIDES.EXPIRED.EXPIRES_AT,
    fullName:
      E2E_WORKER_LIST_FILTER_GUIDES.EXPIRED.FULL_NAME,
    isExternalGuide: true,
    mark: E2E_WORKER_LIST_FILTER_GUIDES.MARK,
  });

const createReservationsWorker = () =>
  createWorkerListFilterFixtureWorker({
    baseRole:
      E2E_WORKER_LIST_FILTER_RESERVATIONS_WORKER.BASE_ROLE,
    expiresAt: null,
    fullName:
      E2E_WORKER_LIST_FILTER_RESERVATIONS_WORKER.FULL_NAME,
    isExternalGuide: false,
    mark: null,
  });

export const createWorkerListFilterFixture =
  async (): Promise<WorkerListFilterFixture> => {
    const workers: WorkerListFilterFixtureWorker[] = [];

    try {
      const activeGuide = await createActiveGuide();
      workers.push(activeGuide);
      const expiredGuide = await createExpiredGuide();
      workers.push(expiredGuide);
      const reservationsWorker =
        await createReservationsWorker();
      workers.push(reservationsWorker);

      return {
        activeGuide,
        expiredGuide,
        reservationsWorker,
        remove: () => removeWorkers(workers),
      };
    } catch (error) {
      await removeWorkers(workers);
      throw error;
    }
  };
