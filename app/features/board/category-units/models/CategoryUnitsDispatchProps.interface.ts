import type { ReactNode } from "react";
import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import type { NullableRef } from "@/app/types";
import type { CategoryUnit } from "./CategoryUnit.interface";

export interface CategoryUnitsDispatchProps {
  afterHeader: ReactNode;
  categoryId: string;
  categoryName: string;
  image: NullableRef<ReservationEquipmentImageOption>;
  unitCount: number;
  units: CategoryUnit[];
}
