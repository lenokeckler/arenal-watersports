export interface PredefinedComboReservationInput {
  comboId: string;
  customerName: string;
  date: string;
  durationHours: number;
  guideIds?: string[];
  peopleCount: number;
  time: string;
}
