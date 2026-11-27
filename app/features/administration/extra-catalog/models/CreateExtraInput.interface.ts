import type { ExtraOccupancyInput } from "./ExtraOccupancyInput.interface";

export interface CreateExtraInput extends ExtraOccupancyInput {
  name: string;
  priceUsd: string;
  priceCrc: string;
}
