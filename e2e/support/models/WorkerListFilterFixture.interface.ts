import type { WorkerListFilterFixtureWorker } from "./WorkerListFilterFixtureWorker.interface";

export interface WorkerListFilterFixture {
  activeGuide: WorkerListFilterFixtureWorker;
  expiredGuide: WorkerListFilterFixtureWorker;
  reservationsWorker: WorkerListFilterFixtureWorker;
  remove: () => Promise<void>;
}
