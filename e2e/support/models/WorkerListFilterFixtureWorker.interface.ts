export interface WorkerListFilterFixtureWorker {
  fullName: string;
  remove: () => Promise<void>;
  username: string;
}
