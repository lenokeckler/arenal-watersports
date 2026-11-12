import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SessionBarView from "../SessionBarView";
import {
  BUTTON_LABEL,
  IDLE_PROPS,
  SESSION_BAR_BUTTON_COUNT,
} from "./SessionBarView.constants";
import { createSessionBarViewPage } from "./SessionBarView.page";

describe("SessionBar theme control", () => {
  it("renders the theme action alongside logout", () => {
    render(<SessionBarView {...IDLE_PROPS} />);
    const page = createSessionBarViewPage();

    expect(page.getButtons()).toHaveLength(
      SESSION_BAR_BUTTON_COUNT
    );
    expect(
      page.getThemeButton(IDLE_PROPS.theme)
    ).toBeInTheDocument();
    expect(
      page.getButton(BUTTON_LABEL)
    ).toBeInTheDocument();
  });

  it("switches the theme without triggering logout", async () => {
    const handlePress = vi.fn();
    const handleToggle = vi.fn();
    render(
      <SessionBarView
        {...IDLE_PROPS}
        handlePress={handlePress}
        handleToggle={handleToggle}
      />
    );
    const page = createSessionBarViewPage();

    await page.pressThemeButton(IDLE_PROPS.theme);

    expect(handleToggle).toHaveBeenCalledOnce();
    expect(handlePress).not.toHaveBeenCalled();
  });
});
