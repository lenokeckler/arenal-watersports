import type { ReactNode } from "react";
import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import type { NullableRef } from "@/app/types";

export interface CategoryUnitMediaProps {
  children?: ReactNode;
  isDimmed?: boolean;
  isMuted?: boolean;
  image: NullableRef<ReservationEquipmentImageOption>;
}
