import type { TariffFormViewModel } from "./TariffFormViewModel.interface";
import type { TariffType } from "./TariffType.type";
import type { TariffTypeSectionState } from "./TariffTypeSectionState.type";

export interface TariffTypeSectionProps extends Pick<
  TariffFormViewModel,
  "errors" | "isSubmitting" | "onPriceChange" | "values"
> {
  state: TariffTypeSectionState;
  type: TariffType;
}
