export interface DispatchSheetFixture {
  categoryId: string;
  categoryName: string;
  customerName: string;
  makeMaintenanceNeeds: () => Promise<void>;
  makeDispatchLate: (minutesLate: number) => Promise<void>;
  addMaintenanceJobs: () => Promise<void>;
  addDamageReports: () => Promise<string>;
  readUnitId: (code: string) => Promise<string>;
  addUnitPhoto: (
    code: string,
    angle: string
  ) => Promise<void>;
  grantGeneralManagerMark: () => Promise<void>;
  readUnitPhotos: (
    code: string
  ) => Promise<UnitPhotoRecord[]>;
  readUnitCorrection: (
    code: string
  ) => Promise<UnitCorrectionState>;
  readMaintenanceJobs: () => Promise<MaintenanceJobsState>;
  readGroupClosing: () => Promise<GroupClosingState>;
  readDispatchDuration: () => Promise<DispatchDurationState>;
  readDispatchReadings: () => Promise<DispatchReadingsState>;
  readDispatchState: () => Promise<DispatchSheetState>;
  remove: () => Promise<void>;
  reservationId: string;
  unitCodes: string[];
}

export interface DispatchSheetState {
  dispatchCount: number;
  dispatchCreatedBy: string | null;
  dispatchedUnitCount: number;
  reservationStatus: string;
}

export interface DispatchUnitReadingState {
  fuelLevel: number | null;
  fuelOut: number | null;
  usageOut: number | null;
  usageTotal: number;
}

export type DispatchReadingsState = Record<
  string,
  DispatchUnitReadingState
>;

export interface DispatchDurationState {
  durationMinutes: number;
  extendedMinutes: number;
}

export interface GroupClosingUnitState {
  fuelIn: number | null;
  fuelLevel: number | null;
  status: string;
  usageIn: number | null;
  usageTotal: number;
}

export interface GroupClosingState {
  closedAt: string | null;
  damageReports: number;
  reservationStatus: string;
  units: Record<string, GroupClosingUnitState>;
}

export interface MaintenanceJobState {
  costAmount: number | null;
  costCurrency: string | null;
  createdBy: string;
  description: string | null;
  isExternal: boolean;
  performedAt: string;
  unitCode: string;
  workType: string;
}

export interface MaintenanceJobsState {
  jobs: MaintenanceJobState[];
  nextOilChangeAt: Record<string, number | null>;
}

export interface UnitCorrectionRecord {
  corrected: Record<string, unknown>;
  createdBy: string;
  previous: Record<string, unknown>;
}

export interface UnitCorrectionState {
  corrections: UnitCorrectionRecord[];
  fuelLevel: number | null;
  fuelMax: number;
  impactCount: number;
  status: string;
  usageTotal: number;
}

export interface UnitPhotoRecord {
  angle: string;
  storagePath: string;
  uploadedBy: string;
}
