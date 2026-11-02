import type { UserEvent } from "@testing-library/user-event";

export interface ReservationDetailPage {
  clickRetry: (user: UserEvent) => Promise<void>;
  getDispatchGroups: () => HTMLElement[];
  getEquipmentText: (text: string) => HTMLElement;
  getHeading: (name: string) => HTMLElement;
  getText: (text: string) => HTMLElement;
  getTexts: (text: string) => HTMLElement[];
}
