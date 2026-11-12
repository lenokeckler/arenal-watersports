export interface EquipmentHoursUnit {
  code: string;
  dispatchCount: number;
  hours: number;
  lastDispatchedAt: string | null;
  unitId: string;
}

export interface EquipmentHoursCategory {
  categoryId: string;
  name: string;
  units: EquipmentHoursUnit[];
}
