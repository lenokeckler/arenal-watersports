import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createDepositLedgerPage = () => {
  const getText = (text: string) => screen.getByText(text);

  const getTextContaining = (text: string) =>
    screen.getByText(text, { exact: false });

  const queryText = (text: string) =>
    screen.queryByText(text);

  const getAlert = () => screen.getByRole(ARIA_ROLE.ALERT);

  const queryAlert = () =>
    screen.queryByRole(ARIA_ROLE.ALERT);

  const getTextInAlert = (text: string) =>
    within(getAlert()).getByText(text);

  const getTextContent = (container: HTMLElement) =>
    container.textContent;

  return {
    getAlert,
    getText,
    getTextContaining,
    getTextContent,
    getTextInAlert,
    queryAlert,
    queryText,
  };
};
