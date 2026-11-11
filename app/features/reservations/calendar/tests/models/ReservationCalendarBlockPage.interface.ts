import type { NullableRef } from "@/app/types";

export interface ReservationCalendarBlockPage {
  getBlock: () => HTMLElement;
  getDetailLink: () => HTMLElement;
  getFocusableElements: () => Element[];
  getModifyLink: () => NullableRef<HTMLElement>;
  getPostponeLink: () => NullableRef<HTMLElement>;
  getSplitLink: () => NullableRef<HTMLElement>;
  getEquipmentImages: () => HTMLImageElement[];
  getText: (text: string) => HTMLElement;
  getTexts: (text: string) => HTMLElement[];
}
