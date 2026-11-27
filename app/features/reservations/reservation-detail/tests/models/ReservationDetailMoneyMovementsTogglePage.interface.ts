import type { UserEvent } from "@testing-library/user-event";

export interface ReservationDetailMoneyMovementsTogglePage {
  clickToggle: (user: UserEvent) => Promise<void>;
  getPanel: () => HTMLElement | null;
  getToggle: () => HTMLElement;
  queryChild: () => HTMLElement | null;
}
