import { BOARD_LAYOUT_STORAGE_KEY } from "@/app/constants";
import type { BoardLayoutPreference } from "@/app/types";

const ignoreBoardLayoutPersistFailure = (): void =>
  undefined;

export const persistBoardLayout = (
  layout: BoardLayoutPreference
): void => {
  try {
    window.localStorage.setItem(
      BOARD_LAYOUT_STORAGE_KEY,
      JSON.stringify(layout)
    );
  } catch {
    ignoreBoardLayoutPersistFailure();
  }
};
