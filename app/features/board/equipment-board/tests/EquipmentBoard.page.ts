import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import {
  ARIA_HIDDEN_ATTRIBUTE,
  BAR_FILL_SELECTOR,
  BAR_SELECTOR,
  CARD_NOT_FOUND_MESSAGE,
  BAR_WIDTH_ATTRIBUTE,
  HEADING_LEVEL_TWO,
} from "./EquipmentBoard.constants";
import { createEquipmentBoardImagePage } from "./EquipmentBoardImage.page";

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

  const getCardLink = (label: string) =>
    screen.getByRole(ARIA_ROLE.LINK, { name: label });

  const getCardLinks = () =>
    within(getGrid()).getAllByRole(ARIA_ROLE.LINK);

  const getLinksIn = (card: HTMLElement) =>
    within(card).getAllByRole(ARIA_ROLE.LINK);

  const tab = async () => {
    await user.tab();
  };

  const queryMemberList = (card: HTMLElement) =>
    within(card).queryByRole(ARIA_ROLE.LIST);

  const queryButton = (card: HTMLElement) =>
    within(card).queryByRole(ARIA_ROLE.BUTTON);

  const getText = (container: HTMLElement, text: string) =>
    within(container).getByText(text);

  const getCardText = (card: HTMLElement) =>
    card.textContent;

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
    ...createEquipmentBoardImagePage(),
    getAlert,
    getBarWidth,
    getCard,
    getCardLink,
    getCardLinks,
    getCardText,
    getCards,
    getGrid,
    getHeadings,
    getLinksIn,
    getMain,
    getPageText,
    getRetryButton,
    getStatus,
    getText,
    queryButton,
    isBarHidden,
    queryGrid,
    queryHeadings,
    queryMemberList,
    queryText,
    retry,
    tab,
  };
};
