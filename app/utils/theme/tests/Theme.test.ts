import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  THEME,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
} from "@/app/constants";
import {
  applyThemeAttribute,
  buildThemeInitScript,
  getStoredTheme,
  persistTheme,
} from "../Theme";

describe("getStoredTheme", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("returns the default theme when nothing is stored", () => {
    expect(getStoredTheme()).toBe(THEME.DARK);
  });

  it("returns the stored theme when it is a valid value", () => {
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      THEME.LIGHT
    );

    expect(getStoredTheme()).toBe(THEME.LIGHT);
  });

  it("falls back to the default theme for a corrupted value", () => {
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      "not-a-real-theme"
    );

    expect(getStoredTheme()).toBe(THEME.DARK);
  });

  it("falls back to the default theme when localStorage throws", () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("storage disabled");
      });

    expect(getStoredTheme()).toBe(THEME.DARK);

    getItemSpy.mockRestore();
  });
});

describe("persistTheme", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("saves the theme under the device-only storage key", () => {
    persistTheme(THEME.LIGHT);

    expect(
      window.localStorage.getItem(THEME_STORAGE_KEY)
    ).toBe(THEME.LIGHT);
  });

  it("does not throw when localStorage write fails", () => {
    const setItemSpy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("storage disabled");
      });

    expect(() => persistTheme(THEME.LIGHT)).not.toThrow();

    setItemSpy.mockRestore();
  });
});

describe("applyThemeAttribute", () => {
  afterEach(() => {
    document.documentElement.removeAttribute(
      THEME_ATTRIBUTE
    );
  });

  it("sets the light attribute for the light theme", () => {
    applyThemeAttribute(THEME.LIGHT);

    expect(
      document.documentElement.getAttribute(THEME_ATTRIBUTE)
    ).toBe(THEME.LIGHT);
  });

  it("removes the attribute for the dark theme", () => {
    document.documentElement.setAttribute(
      THEME_ATTRIBUTE,
      THEME.LIGHT
    );

    applyThemeAttribute(THEME.DARK);

    expect(
      document.documentElement.getAttribute(THEME_ATTRIBUTE)
    ).toBeNull();
  });
});

describe("buildThemeInitScript", () => {
  it("only sets the attribute for the stored light theme", () => {
    const script = buildThemeInitScript();

    expect(script).toContain(THEME_STORAGE_KEY);
    expect(script).toContain(THEME.LIGHT);
    expect(script).toContain(THEME_ATTRIBUTE);
    expect(script).not.toContain(THEME.DARK);
  });
});
