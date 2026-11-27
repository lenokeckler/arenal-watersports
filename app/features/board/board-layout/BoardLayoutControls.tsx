"use client";

import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import BoardLayoutColumnsPicker from "./components/BoardLayoutColumnsPicker";
import BoardLayoutOrderList from "./components/BoardLayoutOrderList";
import { BOARD_LAYOUT_COPY } from "./constants/BoardLayoutCopy.constants";
import { useBoardLayoutControlsViewModel } from "./hooks/useBoardLayoutControlsViewModel";
import { BOARD_LAYOUT_CONTROLS_CLASS } from "./styles/BoardLayoutControls.styles";

const BoardLayoutControls =
  (): NullableRef<React.JSX.Element> => {
    const {
      cards,
      columns,
      handleColumnsChange,
      handleMove,
    } = useBoardLayoutControlsViewModel();

    if (cards.length === 0) {
      return null;
    }

    return (
      <div
        role={ARIA_ROLE.GROUP}
        aria-label={BOARD_LAYOUT_COPY.SECTION_LABEL}
        className={BOARD_LAYOUT_CONTROLS_CLASS}
      >
        <BoardLayoutColumnsPicker
          columns={columns}
          onChange={handleColumnsChange}
        />
        <BoardLayoutOrderList
          cards={cards}
          onMove={handleMove}
        />
      </div>
    );
  };

export default BoardLayoutControls;
