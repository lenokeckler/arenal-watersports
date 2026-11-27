import type { TariffLineViewModel } from "./TariffLineViewModel.interface";

export interface TariffCardViewModel {
  editHref: string;
  hasMissingTariff: boolean;
  id: string;
  lines: TariffLineViewModel[];
  name: string;
}
