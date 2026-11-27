import { useEffect, useMemo } from "react";
import { BROWSER_EVENTS } from "@/app/constants";
import { boardLayoutActions } from "@/app/store";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/store/hooks";
import { readStoredBoardLayout } from "@/app/utils/board-layout/readStoredBoardLayout";
import { orderByBoardOrder } from "@/app/utils/board-layout/orderByBoardOrder";
import type { BoardCard } from "../models/BoardCard.interface";
import type { BoardLayoutViewModel } from "../models/BoardLayoutViewModel.interface";

export const useBoardLayoutViewModel = (
  cards: BoardCard[]
): BoardLayoutViewModel => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(
    (state) => state.boardLayout.columns
  );
  const savedOrder = useAppSelector(
    (state) => state.boardLayout.order
  );

  useEffect(() => {
    const restoreStoredLayout = (): void => {
      dispatch(
        boardLayoutActions.setPreference(
          readStoredBoardLayout()
        )
      );
    };

    restoreStoredLayout();
    window.addEventListener(
      BROWSER_EVENTS.STORAGE,
      restoreStoredLayout
    );

    return () => {
      window.removeEventListener(
        BROWSER_EVENTS.STORAGE,
        restoreStoredLayout
      );
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      boardLayoutActions.setCards(
        cards.map(({ id, label }) => ({ id, label }))
      )
    );

    return () => {
      dispatch(boardLayoutActions.setCards([]));
    };
  }, [cards, dispatch]);

  const orderedCards = useMemo(
    () => orderByBoardOrder(cards, savedOrder),
    [cards, savedOrder]
  );

  return { columns, orderedCards };
};
