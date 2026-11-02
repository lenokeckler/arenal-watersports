import type { ReservationCalendarBlockActionsRenderer } from "./ReservationCalendarBlockActionsRenderer.type";

export interface ReservationCalendarDayContentOptions {
  renderBlockActions?: ReservationCalendarBlockActionsRenderer;
  reserveMobileFabSpace?: boolean;
  showCoverageMessages?: boolean;
  showGuides?: boolean;
}
