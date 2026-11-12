import type { NullableRef } from "@/app/types";

export interface ReservationExtraOptionProps {
  extraId: string;
  isSelected: boolean;
  name: string;
  occupiesInventory: boolean;
  priceCrc: NullableRef<number>;
  priceUsd: NullableRef<number>;
  onToggle: (extraId: string) => void;
}
