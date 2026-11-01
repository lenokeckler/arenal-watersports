import { describe, expect, it } from "vitest";
import {
  ACCESS_SHELL_CONTENT_CLASS,
  ACCESS_SHELL_EMBEDDED_CONTENT_CLASS,
  ACCESS_SHELL_EMBEDDED_PAGE_CLASS,
  ACCESS_SHELL_PAGE_CLASS,
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
