export interface MaintenanceCostTotal {
  currency: string;
  total: number;
}

export interface UnitMaintenanceCost {
  categoryName: string;
  jobsCount: number;
  lastPerformedAt: string;
  totals: MaintenanceCostTotal[];
  unitCode: string;
  unitId: string;
}
