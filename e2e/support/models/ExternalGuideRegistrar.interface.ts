export interface ExternalGuideRegistrar {
  password: string;
  remove: () => Promise<void>;
  username: string;
  workerId: string;
}
