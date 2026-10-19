import type { NullableRef } from "@/app/types";
import type { CustomComboEquipmentSelection } from "./CustomComboEquipmentSelection.interface";

export interface ValidatedCustomComboReservationInput {
  agreedAmountCrc: NullableRef<number>;
  agreedAmountUsd: NullableRef<number>;
  customerName: string;
  date: string;
  durationMinutes: number;
  guideIds: string[];
  items: CustomComboEquipmentSelection[];
  peopleCount: number;
  time: string;
}
