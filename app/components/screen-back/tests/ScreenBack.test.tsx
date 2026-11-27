import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import ScreenBack from "../ScreenBack";
import { SCREEN_BACK_COPY } from "../constants/ScreenBackCopy.constants";
import { SCREEN_BACK_FALLBACK_HREF } from "./ScreenBack.constants";

const back = vi.fn();

const renderScreenBack = () => {
  render(
    <ScreenBack fallbackHref={SCREEN_BACK_FALLBACK_HREF} />
  );
  return screen.getByRole(ARIA_ROLE.LINK, {
    name: new RegExp(SCREEN_BACK_COPY.LABEL),
  });
};

const setCanGoBack = (canGoBack: boolean): void => {
  vi.stubGlobal("navigation", { canGoBack });
};

describe("ScreenBack", () => {
  beforeEach(() => {
    vi.spyOn(window.history, "back").mockImplementation(
      back
    );
  });

  afterEach(() => {
    cleanup();
    back.mockClear();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("links to the parent screen", () => {
    expect(renderScreenBack()).toHaveAttribute(
      "href",
      SCREEN_BACK_FALLBACK_HREF
    );
  });

  it("returns to the previous screen of the app", () => {
    setCanGoBack(true);

    const notPrevented = fireEvent.click(
      renderScreenBack()
    );

    expect(notPrevented).toBe(false);
    expect(back).toHaveBeenCalledTimes(1);
  });

  it("follows the parent link when the app has no previous screen", () => {
    setCanGoBack(false);

    fireEvent.click(renderScreenBack());

    expect(back).not.toHaveBeenCalled();
  });

  it("follows the parent link without the Navigation API", () => {
    fireEvent.click(renderScreenBack());

    expect(back).not.toHaveBeenCalled();
  });

  it("leaves modified clicks to the browser", () => {
    setCanGoBack(true);

    fireEvent.click(renderScreenBack(), { ctrlKey: true });

    expect(back).not.toHaveBeenCalled();
  });
});
