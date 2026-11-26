import type { TariffFormFieldChangeHandler } from "./TariffFormFieldChangeHandler.type";
import type { TariffFormSubmitViewModel } from "./TariffFormSubmitViewModel.interface";
import type { TariffFormValues } from "./TariffFormValues.interface";
import type { TariffPriceField } from "./TariffPriceField.type";
import type { TariffType } from "./TariffType.type";
import type { TariffTypeSectionState } from "./TariffTypeSectionState.type";

export interface TariffFormViewModel extends TariffFormSubmitViewModel {
  bannerMessage: string;
  onBack: () => void;
  onPriceChange: (
    type: TariffType,
    field: TariffPriceField
  ) => TariffFormFieldChangeHandler;
  sectionStates: Record<TariffType, TariffTypeSectionState>;
  title: string;
  values: TariffFormValues;
}
