import type { Page } from "@playwright/test";
import type { ActiveWorker } from "./ActiveWorker.interface";

export interface ReservationHistoryAccessMode {
  signIn: (
    page: Page,
    activeWorker: ActiveWorker
  ) => Promise<void>;
  title: string;
}
