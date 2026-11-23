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

  const getText = (text: string) =>
    screen.queryByText(text);

  const getHeading = (name: string) =>
    screen.getByRole(ARIA_ROLE.HEADING, { name });

  const toggleSection = async (
    title: string
  ): Promise<void> => {
    await user.click(getSectionButton(title));
  };

  return {
    getSectionButton,
    getBackLink,
    getLink,
    getActiveSwitch,
    getChip,
    queryDurationField,
    getText,
    getHeading,
    toggleSection,
  };
};
