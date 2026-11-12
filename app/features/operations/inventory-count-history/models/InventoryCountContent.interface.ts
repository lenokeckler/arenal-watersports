export interface InventoryCountContentUnit {
  code: string;
  countedStatus: string;
  differs: boolean;
  systemStatus: string | null;
}

export interface InventoryCountContentQuantity {
  counted: number;
  differs: boolean;
  field: string;
  system: number | null;
}

export interface InventoryCountContentCategory {
  differenceCount: number;
  name: string;
  quantities: InventoryCountContentQuantity[];
  units: InventoryCountContentUnit[];
}
