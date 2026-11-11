export interface ReservationSplitDraft {
  key: string;
  peopleCount: number;
  quantities: Record<string, number>;
  time: string;
}
