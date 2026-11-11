export interface DispatchSheetFixture {
  categoryName: string;
  customerName: string;
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
