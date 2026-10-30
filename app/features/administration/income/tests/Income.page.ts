import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import {
  DEFINITION_SELECTOR,
  HIDDEN_SIGN_SELECTOR,
  TERM_SELECTOR,
} from "./Income.constants";

export const createIncomePage = () => {
  const getRegion = (name: string) =>
    screen.getByRole(ARIA_ROLE.REGION, { name });

  const queryRegions = () =>
    screen.queryAllByRole(ARIA_ROLE.REGION);

  const getTerms = () =>
    Array.from(
      document.querySelectorAll(TERM_SELECTOR),
      (term) => term.textContent
    );

  const getFigure = (label: string) =>
    screen.getByText(label, { selector: TERM_SELECTOR })
      .nextElementSibling;

  const getFigureText = (label: string) =>
    getFigure(label)?.textContent;

  const getHiddenSigns = () =>
    document.querySelectorAll(HIDDEN_SIGN_SELECTOR);

  const queryDefinitions = () =>
    document.querySelectorAll(DEFINITION_SELECTOR);

  const getText = (text: string) => screen.getByText(text);

  const queryText = (text: string) =>
    screen.queryByText(text);

  const getHeadings = (level: number) =>
    screen.getAllByRole(ARIA_ROLE.HEADING, { level });

  const getWithin = (container: HTMLElement) =>
    within(container);

  return {
    getFigure,
    getFigureText,
    getHeadings,
    getHiddenSigns,
    getRegion,
    getTerms,
    getText,
    getWithin,
    queryDefinitions,
    queryRegions,
    queryText,
  };
};
