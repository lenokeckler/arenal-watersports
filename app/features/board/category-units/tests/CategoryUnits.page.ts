import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  CATEGORY_NAME,
  DECORATIVE_SELECTOR,
  HEADING_LEVEL_TWO,
  RETURN_TEXT_PATTERN,
  UNIT_NOT_FOUND_MESSAGE,
} from "./CategoryUnits.constants";

export const createCategoryUnitsPage = () => {
  const getList = () =>
    screen.getByRole(ARIA_ROLE.LIST, {
      name: CATEGORY_UNITS_COPY.LIST_LABEL(CATEGORY_NAME),
    });

  const getUnits = () => {
    const list = getList();

    return within(list)
      .getAllByRole(ARIA_ROLE.LISTITEM)
      .filter((item) => item.parentElement === list);
  };

  const getUnit = (code: string) => {
    const unit = getUnits().find((candidate) =>
      within(candidate).queryByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL_TWO,
        name: code,
      })
    );

    if (!unit) {
      throw new Error(`${UNIT_NOT_FOUND_MESSAGE} ${code}`);
    }

    return unit;
  };

  const getRow = (unit: HTMLElement) => {
    const row = unit.firstElementChild;

    if (!row) {
      throw new Error(UNIT_NOT_FOUND_MESSAGE);
    }

    return row;
  };

  const getCode = (unit: HTMLElement) =>
    within(unit).getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL_TWO,
    });

  const getRowSectionCount = (unit: HTMLElement) =>
    getRow(unit).children.length;

  const precedes = (first: Element, second: Element) =>
    Boolean(
      first.compareDocumentPosition(second) &
      Node.DOCUMENT_POSITION_FOLLOWING
    );

  const getText = (container: HTMLElement, text: string) =>
    within(container).getByText(text);

  const queryText = (
    container: HTMLElement,
    text: string
  ) => within(container).queryByText(text);

  const queryReturnText = (container: HTMLElement) =>
    within(container).queryByText(RETURN_TEXT_PATTERN);

  const getReturnText = (container: HTMLElement) =>
    within(container).getByText(RETURN_TEXT_PATTERN);

  const getInteractiveElements = (
    container: HTMLElement
  ) => [
    ...within(container).queryAllByRole(ARIA_ROLE.LINK),
    ...within(container).queryAllByRole(ARIA_ROLE.BUTTON),
  ];

  const getDecorativeElements = (container: HTMLElement) =>
    Array.from(
      container.querySelectorAll(DECORATIVE_SELECTOR)
    );

  const getUnitText = (container: HTMLElement) =>
    container.textContent;

  return {
    getCode,
    getDecorativeElements,
    getInteractiveElements,
    getList,
    getRow,
    getRowSectionCount,
    getReturnText,
    getText,
    getUnit,
    getUnits,
    getUnitText,
    precedes,
    queryReturnText,
    queryText,
  };
};
