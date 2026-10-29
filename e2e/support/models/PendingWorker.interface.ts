export interface PendingWorker {
  remove: () => Promise<void>;
  temporaryPassword: string;
  username: string;
}
