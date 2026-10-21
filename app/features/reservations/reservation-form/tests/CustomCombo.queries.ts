import { waitFor, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { CUSTOM_COMBO_TEST } from "./CustomCombo.constants";
import { createCustomComboSelectionQueries } from "./CustomComboSelection.queries";

const createPricingQueries = (
  form: ReturnType<typeof within>
) => {
  const getPricingRegion = (): Promise<HTMLElement> =>
    form.findByRole(ARIA_ROLE.REGION, {
      name: CUSTOM_COMBO_FORM_COPY.PRICING_TITLE,
    });
  return {
    getPricingRegion,
    waitForPricingRegionText: (
      text: string
    ): Promise<HTMLElement> =>
      waitFor(() => {
        const region = form.getByRole(ARIA_ROLE.REGION, {
          name: CUSTOM_COMBO_FORM_COPY.PRICING_TITLE,
        });
        if (!region.textContent?.includes(text)) {
          throw new Error(
            CUSTOM_COMBO_TEST.PRICING_TEXT_NOT_UPDATED
          );
        }
        return region;
      }),
    getAgreedAmountInput: (label: string) =>
      form.getByLabelText(label, { exact: false }),
  };
};

const createGuideQueries = (
  form: ReturnType<typeof within>
) => ({
  getGuideCheckbox: (name: string) =>
    form.getByLabelText(name, { exact: true }),
  getNoGuideState: () =>
    form.getByRole(ARIA_ROLE.STATUS, {
      name: CUSTOM_COMBO_FORM_COPY.NO_GUIDE,
    }),
  getGuideAssignmentField: () =>
    form.getByRole(ARIA_ROLE.GROUP, {
      name: RESERVATION_FORM_UI_COPY.GUIDES,
    }),
  queryGuideAssignmentField: (): NullableRef<HTMLElement> =>
    form.queryByRole(ARIA_ROLE.GROUP, {
      name: RESERVATION_FORM_UI_COPY.GUIDES,
    }),
});

export const createCustomComboQueries = (
  container: HTMLElement
) => {
  const form = within(container);
  return {
    getComboOption: () =>
      form.getByLabelText(
        RESERVATION_TYPE_COPY.OPTIONS.COMBO.label,
        {
          exact: false,
        }
      ),
    getDurationOption: (label: string) =>
      form.getByRole(ARIA_ROLE.BUTTON, { name: label }),
    ...createCustomComboSelectionQueries(form),
    ...createPricingQueries(form),
    ...createGuideQueries(form),
  };
};
