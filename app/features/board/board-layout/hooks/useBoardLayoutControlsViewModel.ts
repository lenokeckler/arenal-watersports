import { useMemo } from "react";
import type { BoardLayoutColumns } from "@/app/constants";
import { boardLayoutActions } from "@/app/store";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/store/hooks";
import { moveBoardOrderItem } from "@/app/utils/board-layout/moveBoardOrderItem";
import { orderByBoardOrder } from "@/app/utils/board-layout/orderByBoardOrder";
import { persistBoardLayout } from "@/app/utils/board-layout/persistBoardLayout";
import type { BoardLayoutControlsViewModel } from "../models/BoardLayoutControlsViewModel.interface";

export const useBoardLayoutControlsViewModel =
  (): BoardLayoutControlsViewModel => {
    const dispatch = useAppDispatch();
    const { cards, columns, order } = useAppSelector(
      (state) => state.boardLayout
    );
    const orderedCards = useMemo(
      () => orderByBoardOrder(cards, order),
      [cards, order]
    );

    const handleColumnsChange = (
      nextColumns: BoardLayoutColumns
    ): void => {
      dispatch(boardLayoutActions.setColumns(nextColumns));
      persistBoardLayout({ columns: nextColumns, order });
    };

    const handleMove = (
      fromIndex: number,
      toIndex: number
    ): void => {
      const currentIds = orderedCards.map(({ id }) => id);
      const nextOrder = moveBoardOrderItem(
        currentIds,
        fromIndex,
        toIndex
      );

      if (nextOrder === currentIds) {
        return;
      }

      dispatch(boardLayoutActions.setOrder(nextOrder));
      persistBoardLayout({ columns, order: nextOrder });
    };

    return {
      cards: orderedCards,
      columns,
      handleColumnsChange,
      handleMove,
    };
  };
