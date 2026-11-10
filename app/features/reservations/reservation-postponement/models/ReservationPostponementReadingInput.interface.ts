import type { Nullable } from "@/app/types";

export interface ReservationPostponementReadingInput {
  fuelIn: Nullable<number>;
  itemId: string;
  usageIn: Nullable<number>;
}
