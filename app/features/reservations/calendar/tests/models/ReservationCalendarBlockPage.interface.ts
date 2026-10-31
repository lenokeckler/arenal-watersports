export interface ReservationCalendarBlockPage {
  getBlock: () => HTMLElement;
  getFocusableElements: () => Element[];
  getEquipmentImages: () => HTMLImageElement[];
  getText: (text: string) => HTMLElement;
  getTexts: (text: string) => HTMLElement[];
}
