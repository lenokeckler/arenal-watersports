import type { TariffCardTone } from "./TariffCardTone.type";
import type { TariffLineViewModel } from "./TariffLineViewModel.interface";

export interface TariffCardViewModel {
  id: string;
  lines: TariffLineViewModel[];
  name: string;
  tone: TariffCardTone;
}
