export interface ReservationCalendarBlockPage {
  getBlock: () => HTMLElement;
  getFocusableElements: () => Element[];
  getText: (text: string) => HTMLElement;
  getTexts: (text: string) => HTMLElement[];
}
