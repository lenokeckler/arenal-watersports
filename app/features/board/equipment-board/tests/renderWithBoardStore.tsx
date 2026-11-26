import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";

export const renderWithBoardStore = (
  ui: ReactElement
): ReturnType<typeof render> =>
  render(<Provider store={store}>{ui}</Provider>);
