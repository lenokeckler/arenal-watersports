import { render } from "@testing-library/react";
import { act } from "react";
import { Provider } from "react-redux";
import { DEFAULT_BOARD_LAYOUT } from "@/app/constants";
import { boardLayoutActions, store } from "@/app/store";
import type {
  BoardLayoutCard,
  BoardLayoutPreference,
} from "@/app/types";
import BoardLayoutControls from "../BoardLayoutControls";

export const resetBoardLayoutStore = (): void => {
  act(() => {
    store.dispatch(
      boardLayoutActions.setPreference(DEFAULT_BOARD_LAYOUT)
    );
    store.dispatch(boardLayoutActions.setCards([]));
  });
};

export const publishBoardCards = (
  cards: BoardLayoutCard[]
): void => {
  act(() => {
    store.dispatch(boardLayoutActions.setCards(cards));
  });
};

const ignorePointerCapture = (): void => undefined;

export const renderBoardLayoutControls = (
  cards: BoardLayoutCard[],
  savedLayout: BoardLayoutPreference = DEFAULT_BOARD_LAYOUT
): ReturnType<typeof render> => {
  HTMLElement.prototype.setPointerCapture =
    ignorePointerCapture;
  resetBoardLayoutStore();
  publishBoardCards(cards);
  act(() => {
    store.dispatch(
      boardLayoutActions.setPreference(savedLayout)
    );
  });

  return render(
    <Provider store={store}>
      <BoardLayoutControls />
    </Provider>
  );
};
