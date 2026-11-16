export interface ReservationDetailChargesPage {
  getChargeLink: () => HTMLElement;
  getRefundLink: () => HTMLElement;
  getRegion: () => HTMLElement;
  queryChargeLink: () => HTMLElement | null;
  queryRefundLink: () => HTMLElement | null;
}
