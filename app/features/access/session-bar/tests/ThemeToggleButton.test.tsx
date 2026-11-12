import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { THEME } from "@/app/constants";
import ThemeToggleButton from "../components/ThemeToggleButton";
import {
  THEME_TOGGLE_ACCESSIBLE_COPY,
  THEME_TOGGLE_COPY,
} from "../constants/ThemeToggleCopy.constants";
import { createThemeToggleButtonPage } from "./ThemeToggleButton.page";

describe("ThemeToggleButton", () => {
  it.each([THEME.DARK, THEME.LIGHT])(
    "labels the action for the next theme from %s",
    (theme) => {
      render(
        <ThemeToggleButton
          onPress={vi.fn()}
          theme={theme}
        />
      );
      const page = createThemeToggleButtonPage();
      const themeButton = page.getThemeButton(theme);

      expect(themeButton).toHaveTextContent(
        THEME_TOGGLE_COPY[theme]
      );
      expect(themeButton).toHaveAccessibleName(
        THEME_TOGGLE_ACCESSIBLE_COPY[theme]
      );
      expect(themeButton).toHaveAttribute(
        "aria-pressed",
        String(theme === THEME.LIGHT)
      );
    }
  );

  it("runs the action when pressed", async () => {
    const onPress = vi.fn();
    render(
      <ThemeToggleButton
        onPress={onPress}
        theme={THEME.DARK}
      />
    );
    const page = createThemeToggleButtonPage();

    await page.pressThemeButton(THEME.DARK);

    expect(onPress).toHaveBeenCalledOnce();
  });
});
