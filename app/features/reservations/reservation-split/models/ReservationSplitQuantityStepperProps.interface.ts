export interface ReservationSplitQuantityStepperProps {
  canDecrease: boolean;
  canIncrease: boolean;
  departureNumber: number;
  error?: string;
  isFrozen?: boolean;
  label: string;
  onDecrease: () => void;
  onIncrease: () => void;
  value: number;
}
