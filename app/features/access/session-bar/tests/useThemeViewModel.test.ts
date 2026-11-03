import { act, renderHook } from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  BROWSER_EVENTS,
  DEFAULT_THEME,
  THEME,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
} from "@/app/constants";
import { useThemeViewModel } from "../hooks/useThemeViewModel";
import { STORAGE_ERROR_MESSAGE } from "./ThemeViewModel.constants";

describe("useThemeViewModel", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    window.dispatchEvent(new Event(BROWSER_EVENTS.STORAGE));
    document.documentElement.removeAttribute(
      THEME_ATTRIBUTE
    );
  });

  it("restores the saved device theme and applies it to the document", () => {
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      THEME.LIGHT
    );

    const { result } = renderHook(useThemeViewModel);

    expect(result.current.theme).toBe(THEME.LIGHT);
    expect(
      document.documentElement.getAttribute(THEME_ATTRIBUTE)
    ).toBe(THEME.LIGHT);
  });

  it("toggles and persists the theme without using account state", () => {
    const { result } = renderHook(useThemeViewModel);

    act(() => result.current.handleToggle());

    expect(result.current.theme).toBe(THEME.LIGHT);
    expect(
      window.localStorage.getItem(THEME_STORAGE_KEY)
    ).toBe(THEME.LIGHT);
    expect(
      document.documentElement.getAttribute(THEME_ATTRIBUTE)
    ).toBe(THEME.LIGHT);

    act(() => result.current.handleToggle());

    expect(result.current.theme).toBe(DEFAULT_THEME);
    expect(
      window.localStorage.getItem(THEME_STORAGE_KEY)
    ).toBe(THEME.DARK);
    expect(
      document.documentElement.hasAttribute(THEME_ATTRIBUTE)
    ).toBe(false);
  });

  it("changes the current theme when device storage rejects a write", () => {
    vi.spyOn(
      Storage.prototype,
      "setItem"
    ).mockImplementation(() => {
      throw new Error(STORAGE_ERROR_MESSAGE);
    });
    const { result } = renderHook(useThemeViewModel);

    act(() => result.current.handleToggle());

    expect(result.current.theme).toBe(THEME.LIGHT);
    expect(
      document.documentElement.getAttribute(THEME_ATTRIBUTE)
    ).toBe(THEME.LIGHT);
  });
});
