import type { ExtraOccupancyInput } from "./ExtraOccupancyInput.interface";

export interface ExtraFormValues extends ExtraOccupancyInput {
  name: string;
  priceUsd: string;
  priceCrc: string;
}
