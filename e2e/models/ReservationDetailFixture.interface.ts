export interface ReservationDetailFixture {
  cleanup: () => Promise<void>;
  customerName: string;
  createdByName: string;
  firstCategoryName: string;
  guideName: string;
  id: string;
  secondCategoryName: string;
}
