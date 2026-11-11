import type { ReservationCalendarBlockActionsRenderer } from "./ReservationCalendarBlockActionsRenderer.type";

export interface ReservationCalendarDayContentOptions {
  enableDetailLinks?: boolean;
  renderBlockActions?: ReservationCalendarBlockActionsRenderer;
  reserveMobileFabSpace?: boolean;
  showCoverageMessages?: boolean;
  showGuides?: boolean;
}
