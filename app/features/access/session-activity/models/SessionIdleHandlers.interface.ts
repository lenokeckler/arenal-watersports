export interface SessionIdleHandlers {
  onExpire: () => Promise<void>;
  onRecheck: () => Promise<void>;
}
