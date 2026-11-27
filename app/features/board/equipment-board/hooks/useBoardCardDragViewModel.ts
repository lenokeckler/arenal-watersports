import { useEffect, useRef, useState } from "react";
import { BROWSER_EVENTS } from "@/app/constants";
import { boardLayoutActions } from "@/app/store";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/store/hooks";
import type { NullableRef } from "@/app/types";
import { moveBoardOrderItem } from "@/app/utils/board-layout/moveBoardOrderItem";
import { persistBoardLayout } from "@/app/utils/board-layout/persistBoardLayout";
import { resolveGridDragTargetIndex } from "@/app/utils/board-layout/resolveGridDragTargetIndex";
import { BOARD_CARD_DRAG } from "../constants/BoardCardDrag.constants";
import type { BoardCard } from "../models/BoardCard.interface";
import type { BoardCardDragItemProps } from "../models/BoardCardDragItemProps.interface";
import type { BoardCardDragViewModel } from "../models/BoardCardDragViewModel.interface";
import type { BoardCardPress } from "../models/BoardCardPress.interface";

const capturePointer = (
  element: HTMLDivElement,
  pointerId: number
): boolean => {
  try {
    element.setPointerCapture(pointerId);
    return true;
  } catch {
    return false;
  }
};

const vibrateBriefly = (): void => {
  if (typeof navigator.vibrate === "function") {
    navigator.vibrate(BOARD_CARD_DRAG.VIBRATE_MS);
  }
};

const preventTouchScroll = (event: TouchEvent): void => {
  event.preventDefault();
};

export const useBoardCardDragViewModel = (
  cards: BoardCard[]
): BoardCardDragViewModel => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(
    (state) => state.boardLayout.columns
  );
  const gridRef = useRef<NullableRef<HTMLDivElement>>(null);
  const pressRef =
    useRef<NullableRef<BoardCardPress>>(null);
  const timerRef =
    useRef<NullableRef<ReturnType<typeof setTimeout>>>(
      null
    );
  const didDragRef = useRef(false);
  const [draggedId, setDraggedId] =
    useState<NullableRef<string>>(null);

  useEffect(() => {
    if (draggedId !== null) {
      document.addEventListener(
        BROWSER_EVENTS.TOUCHMOVE,
        preventTouchScroll,
        { passive: false }
      );
    }

    return () => {
      document.removeEventListener(
        BROWSER_EVENTS.TOUCHMOVE,
        preventTouchScroll
      );
    };
  }, [draggedId]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    },
    []
  );

  const clearTimer = (): void => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const endPress = (): void => {
    clearTimer();
    pressRef.current = null;
    setDraggedId(null);
  };

  const startDrag = (press: BoardCardPress): void => {
    didDragRef.current = true;
    capturePointer(press.element, press.pointerId);
    vibrateBriefly();
    setDraggedId(press.id);
  };

  const moveDraggedCard = (
    id: string,
    x: number,
    y: number
  ): void => {
    const grid = gridRef.current;
    const ids = cards.map((card) => card.id);
    const fromIndex = ids.indexOf(id);

    if (
      !grid ||
      fromIndex === BOARD_CARD_DRAG.NOT_FOUND_INDEX
    ) {
      return;
    }

    const rects = Array.from(grid.children, (item) => {
      const { bottom, left, right, top } =
        item.getBoundingClientRect();
      return { bottom, left, right, top };
    });
    const toIndex = resolveGridDragTargetIndex(rects, x, y);
    const nextOrder = moveBoardOrderItem(
      ids,
      fromIndex,
      toIndex
    );

    if (nextOrder === ids) {
      return;
    }

    dispatch(boardLayoutActions.setOrder(nextOrder));
    persistBoardLayout({ columns, order: nextOrder });
  };

  const hasLeftTolerance = (
    press: BoardCardPress,
    x: number,
    y: number
  ): boolean =>
    Math.hypot(x - press.startX, y - press.startY) >
    BOARD_CARD_DRAG.MOVE_TOLERANCE_PX;

  const getItemDragProps = (
    id: string
  ): BoardCardDragItemProps => ({
    onClickCapture: (event) => {
      if (didDragRef.current) {
        event.preventDefault();
        event.stopPropagation();
        didDragRef.current = false;
      }
    },
    onContextMenu: (event) => {
      if (pressRef.current !== null) {
        event.preventDefault();
      }
    },
    onDragStart: (event) => {
      event.preventDefault();
    },
    onLostPointerCapture: (event) => {
      const press = pressRef.current;

      if (
        draggedId === id &&
        press?.pointerId === event.pointerId
      ) {
        capturePointer(press.element, press.pointerId);
      }
    },
    onPointerCancel: endPress,
    onPointerDown: (event) => {
      if (
        event.button !==
        BOARD_CARD_DRAG.PRIMARY_POINTER_BUTTON
      ) {
        return;
      }

      const press: BoardCardPress = {
        element: event.currentTarget,
        id,
        isMouse:
          event.pointerType ===
          BOARD_CARD_DRAG.MOUSE_POINTER_TYPE,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
      };

      clearTimer();
      didDragRef.current = false;
      pressRef.current = press;

      if (!press.isMouse) {
        timerRef.current = setTimeout(() => {
          timerRef.current = null;
          startDrag(press);
        }, BOARD_CARD_DRAG.LONG_PRESS_MS);
      }
    },
    onPointerMove: (event) => {
      const press = pressRef.current;

      if (
        press === null ||
        press.pointerId !== event.pointerId
      ) {
        return;
      }

      if (draggedId === press.id) {
        moveDraggedCard(
          press.id,
          event.clientX,
          event.clientY
        );
        return;
      }

      if (
        !hasLeftTolerance(
          press,
          event.clientX,
          event.clientY
        )
      ) {
        return;
      }

      if (press.isMouse) {
        startDrag(press);
        return;
      }

      clearTimer();
      pressRef.current = null;
    },
    onPointerUp: endPress,
  });

  return { draggedId, getItemDragProps, gridRef };
};
