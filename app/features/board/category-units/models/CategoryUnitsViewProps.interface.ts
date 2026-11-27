import type { ReactNode } from "react";
import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import type { NullableRef } from "@/app/types";
import type { CategoryUnit } from "./CategoryUnit.interface";

export interface CategoryUnitsViewProps {
  isPaginated?: boolean;
  afterHeader: ReactNode;
  canDispatch: boolean;
  categoryId: string;
  categoryName: string;
  filterControl: ReactNode;
  hasPhotos?: boolean;
  image: NullableRef<ReservationEquipmentImageOption>;
  units: CategoryUnit[];
}
