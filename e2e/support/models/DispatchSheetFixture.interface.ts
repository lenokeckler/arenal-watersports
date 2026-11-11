export interface DispatchSheetFixture {
  categoryId: string;
  categoryName: string;
  customerName: string;
  makeMaintenanceNeeds: () => Promise<void>;
  makeDispatchLate: (minutesLate: number) => Promise<void>;
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
