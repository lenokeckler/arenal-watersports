import { describe, expect, it } from "vitest";
import { WIDE_LAYOUT_ATTRIBUTE } from "@/app/constants";
import {
  ACCESS_SHELL_BACKDROP_CLASS,
  ACCESS_SHELL_CARD_CLASS,
  ACCESS_SHELL_CONTENT_CLASS,
  ACCESS_SHELL_EMBEDDED_CONTENT_CLASS,
  ACCESS_SHELL_EMBEDDED_PAGE_CLASS,
  ACCESS_SHELL_PAGE_CLASS,
  ACCESS_SHELL_WIDE_CARD_CLASS,
  resolveAccessShellContentClassName,
  resolveAccessShellPageClassName,
} from "../styles/AccessScreenShell.styles";

describe("resolveAccessShellPageClassName", () => {
  it("returns the full-screen page class when not embedded", () => {
    expect(resolveAccessShellPageClassName(false)).toBe(
      ACCESS_SHELL_PAGE_CLASS
    );
  });

  it("returns the embedded page class when embedded", () => {
    expect(resolveAccessShellPageClassName(true)).toBe(
      ACCESS_SHELL_EMBEDDED_PAGE_CLASS
    );
  });
});

describe("resolveAccessShellContentClassName", () => {
  it("returns the full-screen content class when not embedded", () => {
    expect(resolveAccessShellContentClassName(false)).toBe(
      ACCESS_SHELL_CONTENT_CLASS
    );
  });

  it("returns the embedded content class when embedded", () => {
    expect(resolveAccessShellContentClassName(true)).toBe(
      ACCESS_SHELL_EMBEDDED_CONTENT_CLASS
    );
  });
});

describe("wide layout variants", () => {
  it("target the attribute the screens put on their content", () => {
    expect(ACCESS_SHELL_WIDE_CARD_CLASS).toContain(
      `has-[[${WIDE_LAYOUT_ATTRIBUTE}]]:max-w-4xl`
    );
    expect(ACCESS_SHELL_EMBEDDED_CONTENT_CLASS).toContain(
      `has-[[${WIDE_LAYOUT_ATTRIBUTE}]]:items-start`
    );
  });

  it("hide the glow of the embedded page for a wide screen", () => {
    expect(ACCESS_SHELL_EMBEDDED_PAGE_CLASS).toContain(
      "group"
    );
    expect(ACCESS_SHELL_BACKDROP_CLASS).toContain(
      `group-has-[[${WIDE_LAYOUT_ATTRIBUTE}]]:hidden`
    );
  });

  it("are part of the card class", () => {
    expect(ACCESS_SHELL_CARD_CLASS).toContain(
      ACCESS_SHELL_WIDE_CARD_CLASS
    );
  });
});
