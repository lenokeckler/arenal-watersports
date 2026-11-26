import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { isBrowserOffline } from "../isBrowserOffline";

describe("isBrowserOffline", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("is true when the navigator reports offline", () => {
    vi.stubGlobal("navigator", { onLine: false });

    expect(isBrowserOffline()).toBe(true);
  });

  it("is false when the navigator reports online", () => {
    vi.stubGlobal("navigator", { onLine: true });

    expect(isBrowserOffline()).toBe(false);
  });

  it("is false when there is no navigator", () => {
    vi.stubGlobal("navigator", undefined);

    expect(isBrowserOffline()).toBe(false);
  });
});
