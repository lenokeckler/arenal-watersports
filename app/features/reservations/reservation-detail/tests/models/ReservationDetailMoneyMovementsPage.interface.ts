import type { UserEvent } from "@testing-library/user-event";

export interface ReservationDetailMoneyMovementsPage {
  clickToggle: (user: UserEvent) => Promise<void>;
  getRows: () => HTMLElement[];
  queryEmpty: () => HTMLElement | null;
  queryToggle: () => HTMLElement | null;
}
