export interface MaintenanceJobDraft {
  costAmount: string;
  costCurrency: string;
  description: string;
  isExternal: boolean;
  nextOilChangeAt: string;
  performedAt: string;
  unitId: string;
  workType: string;
}
