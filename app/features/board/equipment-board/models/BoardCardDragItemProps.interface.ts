export interface BoardCardDragItemProps {
  onClickCapture: (
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
  onContextMenu: (
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>
  ) => void;
  onLostPointerCapture: (
    event: React.PointerEvent<HTMLDivElement>
  ) => void;
  onPointerCancel: () => void;
  onPointerDown: (
    event: React.PointerEvent<HTMLDivElement>
  ) => void;
  onPointerMove: (
    event: React.PointerEvent<HTMLDivElement>
  ) => void;
  onPointerUp: () => void;
}
