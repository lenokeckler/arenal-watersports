export interface RealtimeRefreshScheduler {
  dispose: () => void;
  isDisposed: () => boolean;
  schedule: () => void;
}
