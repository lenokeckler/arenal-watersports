import type { CostaRicaDayRange } from "@/app/utils/costa-rica-day/models/CostaRicaDayRange.interface";

export type RefundRange = Pick<
  CostaRicaDayRange,
  "startsAt" | "endsAt"
>;
