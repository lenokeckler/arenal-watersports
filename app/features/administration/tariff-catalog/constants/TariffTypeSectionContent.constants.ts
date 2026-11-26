import { STRING } from "@/app/constants";
import type { TariffTypeSectionContent } from "../models/TariffTypeSectionContent.interface";
import type { TariffTypeSectionState } from "../models/TariffTypeSectionState.type";
import { TARIFF_FORM_COPY } from "./TariffFormCopy.constants";
import { TARIFF_TYPE_SECTION_STATE } from "./TariffTypeSectionState.constants";

export const TARIFF_TYPE_SECTION_CONTENT: Record<
  TariffTypeSectionState,
  TariffTypeSectionContent
> = {
  [TARIFF_TYPE_SECTION_STATE.EMPTY]: {
    help: TARIFF_FORM_COPY.EMPTY_TYPE_HELP,
    placeholder: TARIFF_FORM_COPY.NO_PRICE_PLACEHOLDER,
    status: TARIFF_FORM_COPY.STATUS_EMPTY,
  },
  [TARIFF_TYPE_SECTION_STATE.SAVED]: {
    help: TARIFF_FORM_COPY.SAVED_TYPE_HELP,
    placeholder: STRING.Empty,
    status: TARIFF_FORM_COPY.STATUS_SAVED,
  },
};
