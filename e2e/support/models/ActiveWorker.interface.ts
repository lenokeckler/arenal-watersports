export interface ActiveWorker {
  id: string;
  password: string;
  remove: () => Promise<void>;
  username: string;
}
