export interface ProvisionedE2eWorker {
  remove: () => Promise<void>;
  username: string;
  workerId: string;
}
