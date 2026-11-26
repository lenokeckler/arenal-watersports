import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import type { NullableRef } from "@/app/types";
import type { DispatchCandidateUnit } from "./DispatchCandidateUnit.interface";

export interface DispatchUnitCardProps {
  image: NullableRef<ReservationEquipmentImageOption>;
  isDisabled: boolean;
  isSelected: boolean;
  onToggle: () => void;
  unit: DispatchCandidateUnit;
}
