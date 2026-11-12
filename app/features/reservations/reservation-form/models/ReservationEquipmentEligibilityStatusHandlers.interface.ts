export interface ReservationEquipmentEligibilityStatusHandlers {
  isActive: () => boolean;
  onSubscribed: () => void;
  onUnavailable: () => void;
}
