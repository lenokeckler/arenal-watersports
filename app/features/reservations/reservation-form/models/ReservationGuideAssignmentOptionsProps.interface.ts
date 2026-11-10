import type { ReservationGuideOption } from "./ReservationGuideOption.interface";

export interface ReservationGuideAssignmentOptionsProps {
  guides: ReservationGuideOption[];
  onToggle: (guideId: string) => void;
  selectedGuideIds: string[];
}
