export interface DispatchTakeViewModel {
  canTakeLess: boolean;
  canTakeMore: boolean;
  count: number;
  handleTakeLess: () => void;
  handleTakeMore: () => void;
  isAdjustable: boolean;
  pendingAfter: number;
}
