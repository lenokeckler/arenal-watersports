import type { CostaRicaDayRange } from "@/app/utils/costa-rica-day/models/CostaRicaDayRange.interface";

export type ChargeRange = Pick<
  CostaRicaDayRange,
  "startsAt" | "endsAt"
>;
