export interface ReservationSplitQuantityStepperProps {
  canDecrease: boolean;
  canIncrease: boolean;
  controlId?: string;
  departureNumber: number;
  error?: string;
  isFrozen?: boolean;
  label: string;
  onDecrease: () => void;
  onIncrease: () => void;
  value: number;
}
