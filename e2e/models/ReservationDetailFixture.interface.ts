export interface ReservationDetailFixture {
  cancel: () => Promise<void>;
  cleanup: () => Promise<void>;
  clearDetails: () => Promise<void>;
  createSplitChild: () => Promise<string>;
  customerName: string;
  createdByName: string;
  firstCategoryName: string;
  guideName: string;
  id: string;
  secondCategoryName: string;
  workerPassword: string;
  workerUsername: string;
}
