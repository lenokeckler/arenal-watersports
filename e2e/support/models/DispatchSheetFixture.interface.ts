export interface DispatchSheetFixture {
  categoryId: string;
  categoryName: string;
  customerName: string;
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
