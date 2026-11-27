export interface ReservationDepositDecisionFieldProps {
  hasDeposit: boolean;
  isPending: boolean;
  onSelect: (hasDeposit: boolean) => void;
}
