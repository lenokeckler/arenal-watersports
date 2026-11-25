import { useRef, useState } from "react";
import { KEYBOARD } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { resolveDragTargetIndex } from "@/app/utils/board-layout/resolveDragTargetIndex";
import { BOARD_LAYOUT_DRAG } from "../constants/BoardLayoutDrag.constants";
import type {
  BoardLayoutKeyboardEvent,
  BoardLayoutPointerEvent,
} from "../models/BoardLayoutHandleEvents.type";
import type { BoardLayoutHandleProps } from "../models/BoardLayoutHandleProps.interface";
import type { BoardLayoutOrderListProps } from "../models/BoardLayoutOrderListProps.interface";
import type { BoardLayoutOrderListViewModel } from "../models/BoardLayoutOrderListViewModel.interface";

const NOT_FOUND_INDEX = -1;

export const useBoardLayoutOrderListViewModel = ({
  cards,
  onMove,
}: BoardLayoutOrderListProps): BoardLayoutOrderListViewModel => {
  const listRef = useRef<HTMLDivElement>(null);
  const activePointerId = useRef<NullableRef<number>>(null);
  const [draggedId, setDraggedId] =
    useState<NullableRef<string>>(null);

  const endDrag = (): void => {
    activePointerId.current = null;
    setDraggedId(null);
  };

  const captureHandle = (
    event: BoardLayoutPointerEvent
  ): void => {
    try {
      event.currentTarget.setPointerCapture(
        event.pointerId
      );
    } catch {
      endDrag();
    }
  };

  const keepCaptureWhileDragging = (
    event: BoardLayoutPointerEvent
  ): void => {
    if (activePointerId.current === event.pointerId) {
      captureHandle(event);
    }
  };

  const moveDraggedCard = (
    id: string,
    pointerY: number
  ): void => {
    const list = listRef.current;
    const fromIndex = cards.findIndex(
      (card) => card.id === id
    );

    if (!list || fromIndex === NOT_FOUND_INDEX) {
      return;
    }

    const slots = Array.from(list.children, (row) => {
      const { bottom, top } = row.getBoundingClientRect();
      return { bottom, top };
    });
    const targetIndex = resolveDragTargetIndex(
      slots,
      pointerY
    );

    if (targetIndex !== NOT_FOUND_INDEX) {
      onMove(fromIndex, targetIndex);
    }
  };

  const moveWithKeyboard = (
    event: BoardLayoutKeyboardEvent,
    index: number
  ): void => {
    if (event.key === KEYBOARD.ARROW_UP) {
      event.preventDefault();
      onMove(
        index,
        index - BOARD_LAYOUT_DRAG.KEYBOARD_STEP
      );
    }

    if (event.key === KEYBOARD.ARROW_DOWN) {
      event.preventDefault();
      onMove(
        index,
        index + BOARD_LAYOUT_DRAG.KEYBOARD_STEP
      );
    }
  };

  const getHandleProps = (
    id: string,
    index: number
  ): BoardLayoutHandleProps => ({
    onKeyDown: (event) => moveWithKeyboard(event, index),
    onLostPointerCapture: keepCaptureWhileDragging,
    onPointerCancel: endDrag,
    onPointerDown: (event) => {
      if (
        event.button !==
        BOARD_LAYOUT_DRAG.PRIMARY_POINTER_BUTTON
      ) {
        return;
      }
      activePointerId.current = event.pointerId;
      setDraggedId(id);
      captureHandle(event);
    },
    onPointerMove: (event) => {
      if (draggedId === id) {
        moveDraggedCard(id, event.clientY);
      }
    },
    onPointerUp: endDrag,
  });

  return { draggedId, getHandleProps, listRef };
};
