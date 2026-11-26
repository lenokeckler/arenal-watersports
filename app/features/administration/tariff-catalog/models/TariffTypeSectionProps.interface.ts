import type { TariffFormViewModel } from "./TariffFormViewModel.interface";
import type { TariffType } from "./TariffType.type";

export interface TariffTypeSectionProps extends Pick<
  TariffFormViewModel,
  "errors" | "isSubmitting" | "onPriceChange" | "values"
> {
  type: TariffType;
}
