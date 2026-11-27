import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import { TARIFF_FORM_COPY } from "../constants/TariffFormCopy.constants";
import { TARIFF_TYPE_LABEL } from "../constants/TariffTypeLabel.constants";
import type { TariffType } from "../models/TariffType.type";

export const createTariffFormPage = () => {
  const user = userEvent.setup();

  const getSection = (type: TariffType) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: TARIFF_TYPE_LABEL[type],
      })
    );

  const getUsdField = (type: TariffType) =>
    getSection(type).getByLabelText(
      TARIFF_FORM_COPY.USD_LABEL
    );

  const getCrcField = (type: TariffType) =>
    getSection(type).getByLabelText(
      TARIFF_FORM_COPY.CRC_LABEL
    );

  const getButton = (name: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name });

  const typeInto = async (
    field: HTMLElement,
    text: string
  ): Promise<void> => {
    await user.clear(field);
    await user.type(field, text);
  };

  return {
    clickBack: () =>
      user.click(getButton(TARIFF_FORM_COPY.BACK_BUTTON)),
    getBackButton: () =>
      getButton(TARIFF_FORM_COPY.BACK_BUTTON),
    getBanner: () => screen.queryByRole(ARIA_ROLE.ALERT),
    getCrcField,
    getUsdField,
    queryHeading: (name: string) =>
      screen.queryByRole(ARIA_ROLE.HEADING, { name }),
    queryText: (text: string) => screen.queryByText(text),
    querySavingButton: () =>
      screen.queryByRole(ARIA_ROLE.BUTTON, {
        name: TARIFF_FORM_COPY.SAVING_TEXT,
      }),
    querySectionUnits: (type: TariffType) =>
      getSection(type).queryAllByText(
        TARIFF_CATALOG_COPY.UNIT_PER_HOUR
      ),
    submit: () =>
      user.click(getButton(TARIFF_FORM_COPY.SAVE_BUTTON)),
    typeCrc: (type: TariffType, text: string) =>
      typeInto(getCrcField(type), text),
    typeUsd: (type: TariffType, text: string) =>
      typeInto(getUsdField(type), text),
  };
};
