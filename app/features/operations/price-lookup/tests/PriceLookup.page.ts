import {
  render,
  screen,
  within,
} from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import type { ReactElement } from "react";

const renderView = (view: ReactElement): void => {
  render(view);
};

const getHeading = (name: string): HTMLElement =>
  screen.getByRole(ARIA_ROLE.HEADING, { name });

const getRegion = (name: string): HTMLElement =>
  screen.getByRole(ARIA_ROLE.REGION, { name });

const getRows = (
  container: HTMLElement,
  listName: string
): HTMLElement[] =>
  within(
    within(container).getByRole(ARIA_ROLE.LIST, {
      name: listName,
    })
  ).getAllByRole(ARIA_ROLE.LISTITEM);

const queryAlert = (): HTMLElement | null =>
  screen.queryByRole(ARIA_ROLE.ALERT);

const countInteractiveElements = (): number =>
  screen.queryAllByRole(ARIA_ROLE.BUTTON).length +
  screen.queryAllByRole(ARIA_ROLE.LINK).length +
  screen.queryAllByRole(ARIA_ROLE.TEXTBOX).length;

export const createPriceLookupPage = () => ({
  countInteractiveElements,
  getHeading,
  getRegion,
  getRows,
  queryAlert,
  render: renderView,
});
