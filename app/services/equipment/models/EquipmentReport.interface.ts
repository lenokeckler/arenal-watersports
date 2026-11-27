import type { Database, NullableRef } from "@/app/types";

export interface EquipmentReport {
  cause: NullableRef<
    Database["public"]["Enums"]["damage_cause"]
  >;
  createdAt: string;
  date: string;
  hasPhotos: boolean;
  description: NullableRef<string>;
  hits: number;
  id: string;
  isPending: boolean;
  isRetired: boolean;
  reservationId: NullableRef<string>;
  unitCode: string;
  unitId: string;
}
