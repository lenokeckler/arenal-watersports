export interface ReservationSplitQuantityStepperProps {
  canDecrease: boolean;
  canIncrease: boolean;
  departureNumber: number;
  error?: string;
  label: string;
  onDecrease: () => void;
  onIncrease: () => void;
  value: number;
}
