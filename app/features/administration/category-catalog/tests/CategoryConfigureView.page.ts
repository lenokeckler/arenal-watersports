import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";

export const createCategoryConfigureViewPage = () => {
  const user = userEvent.setup();

  const getSectionButton = (title: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(`^${title}`),
    });

  const getBackLink = (label: string) =>
    screen.getByRole(ARIA_ROLE.LINK, { name: label });

  const getLink = (label: string) =>
    screen.queryByRole(ARIA_ROLE.LINK, { name: label });

  const getActiveSwitch = (label: string) =>
    screen.getByRole(ARIA_ROLE.SWITCH, { name: label });

  const getChip = (label: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name: label });

  const queryDurationField = () =>
    screen.queryByRole(ARIA_ROLE.TEXTBOX);

  const getField = (label: string) =>
    screen.queryByLabelText(label, { exact: false });

  const getText = (text: string) =>
    screen.queryByText(text);

  const getHeading = (name: string) =>
    screen.getByRole(ARIA_ROLE.HEADING, { name });

  const toggleSection = async (
    title: string
  ): Promise<void> => {
    await user.click(getSectionButton(title));
  };

  const fillField = async (
    label: string,
    text: string
  ): Promise<void> => {
    await user.type(
      screen.getByLabelText(label, { exact: false }),
      text
    );
  };

  const clickField = async (
    label: string
  ): Promise<void> => {
    await user.click(
      screen.getByLabelText(label, { exact: false })
    );
  };

  const clickChip = async (
    label: string
  ): Promise<void> => {
    await user.click(getChip(label));
  };

  return {
    getSectionButton,
    getBackLink,
    getLink,
    getActiveSwitch,
    getChip,
    queryDurationField,
    getField,
    getText,
    getHeading,
    fillField,
    clickField,
    clickChip,
    toggleSection,
  };
};
