import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import {
  ARIA_EXPANDED_ATTRIBUTE,
  ARIA_HIDDEN_ATTRIBUTE,
  ARIA_TRUE,
  BAR_FILL_SELECTOR,
  BAR_SELECTOR,
  CARD_NOT_FOUND_MESSAGE,
  BAR_WIDTH_ATTRIBUTE,
  HEADING_LEVEL_TWO,
  IMAGE_ELEMENT_SELECTOR,
  IMAGE_SOURCE_ATTRIBUTE,
} from "./EquipmentBoard.constants";

export const createEquipmentBoardPage = () => {
  const user = userEvent.setup();

  const getMain = () => screen.getByRole(ARIA_ROLE.MAIN);

  const getGrid = () =>
    screen.getByRole(ARIA_ROLE.LIST, {
      name: EQUIPMENT_BOARD_COPY.GRID_LABEL,
    });

  const queryGrid = () =>
    screen.queryByRole(ARIA_ROLE.LIST, {
      name: EQUIPMENT_BOARD_COPY.GRID_LABEL,
    });

  const getCards = () => {
    const grid = getGrid();

    return within(grid)
      .getAllByRole(ARIA_ROLE.LISTITEM)
      .filter((item) => item.parentElement === grid);
  };

  const getCard = (label: string) => {
    const card = getCards().find((candidate) =>
      within(candidate).queryByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL_TWO,
        name: label,
      })
    );

    if (!card) {
      throw new Error(`${CARD_NOT_FOUND_MESSAGE} ${label}`);
    }

    return card;
  };

  const getMemberLines = (card: HTMLElement) =>
    within(
      within(card).getByRole(ARIA_ROLE.LIST)
    ).getAllByRole(ARIA_ROLE.LISTITEM);

  const queryMemberList = (card: HTMLElement) =>
    within(card).queryByRole(ARIA_ROLE.LIST);

  const getToggle = (card: HTMLElement) =>
    within(card).getByRole(ARIA_ROLE.BUTTON);

  const queryToggle = (card: HTMLElement) =>
    within(card).queryByRole(ARIA_ROLE.BUTTON);

  const isToggleExpanded = (card: HTMLElement) =>
    getToggle(card).getAttribute(
      ARIA_EXPANDED_ATTRIBUTE
    ) === ARIA_TRUE;

  const toggleCard = async (card: HTMLElement) => {
    await user.click(getToggle(card));
  };

  const getText = (container: HTMLElement, text: string) =>
    within(container).getByText(text);

  const getCardText = (card: HTMLElement) =>
    card.textContent;

  const hasImage = (card: HTMLElement) =>
    card.querySelector(IMAGE_ELEMENT_SELECTOR) !== null;

  const getImageSource = (card: HTMLElement) =>
    card
      .querySelector(IMAGE_ELEMENT_SELECTOR)
      ?.getAttribute(IMAGE_SOURCE_ATTRIBUTE);

  const getBarWidth = (card: HTMLElement) =>
    card
      .querySelector(BAR_FILL_SELECTOR)
      ?.getAttribute(BAR_WIDTH_ATTRIBUTE);

  const isBarHidden = (card: HTMLElement) =>
    card
      .querySelector(BAR_SELECTOR)
      ?.getAttribute(ARIA_HIDDEN_ATTRIBUTE);

  const getHeadings = (level: number) =>
    screen.getAllByRole(ARIA_ROLE.HEADING, { level });

  const queryHeadings = (level: number) =>
    screen.queryAllByRole(ARIA_ROLE.HEADING, { level });

  const getAlert = () => screen.getByRole(ARIA_ROLE.ALERT);

  const getStatus = () =>
    screen.getByRole(ARIA_ROLE.STATUS);

  const getRetryButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: EQUIPMENT_BOARD_COPY.RETRY,
    });

  const queryText = (text: string) =>
    screen.queryByText(text);

  const getPageText = (text: string) =>
    screen.getByText(text);

  const retry = async () => {
    await user.click(getRetryButton());
  };

  return {
    getAlert,
    getBarWidth,
    getCard,
    getImageSource,
    getCardText,
    getCards,
    getGrid,
    getHeadings,
    hasImage,
    getMain,
    getMemberLines,
    getPageText,
    getRetryButton,
    getStatus,
    getText,
    getToggle,
    isToggleExpanded,
    queryToggle,
    toggleCard,
    isBarHidden,
    queryGrid,
    queryHeadings,
    queryMemberList,
    queryText,
    retry,
  };
};
