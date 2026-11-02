import type { NullableRef } from "@/app/types";

export interface ReservationCalendarBlockPage {
  getBlock: () => HTMLElement;
  getFocusableElements: () => Element[];
  getModifyLink: () => NullableRef<HTMLElement>;
  getEquipmentImages: () => HTMLImageElement[];
  getText: (text: string) => HTMLElement;
  getTexts: (text: string) => HTMLElement[];
}
