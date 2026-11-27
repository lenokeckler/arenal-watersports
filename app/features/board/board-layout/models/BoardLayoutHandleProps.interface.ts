import type {
  BoardLayoutKeyboardEvent,
  BoardLayoutPointerEvent,
} from "./BoardLayoutHandleEvents.type";

export interface BoardLayoutHandleProps {
  onKeyDown: (event: BoardLayoutKeyboardEvent) => void;
  onLostPointerCapture: (
    event: BoardLayoutPointerEvent
  ) => void;
  onPointerCancel: () => void;
  onPointerDown: (event: BoardLayoutPointerEvent) => void;
  onPointerMove: (event: BoardLayoutPointerEvent) => void;
  onPointerUp: () => void;
}
