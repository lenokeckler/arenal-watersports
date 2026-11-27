import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BROWSER_EVENTS } from "@/app/constants";
import { useUnsavedChangesGuard } from "../hooks/useUnsavedChangesGuard";

const dispatchBeforeUnload = (): boolean => {
  const event = new Event(BROWSER_EVENTS.BEFORE_UNLOAD, {
    cancelable: true,
  });
  window.dispatchEvent(event);
  return event.defaultPrevented;
};

describe("useUnsavedChangesGuard", () => {
  it("blocks the page unload while there are unsaved changes", () => {
    renderHook(() => useUnsavedChangesGuard(true));

    expect(dispatchBeforeUnload()).toBe(true);
  });

  it("stops blocking once the hook unmounts", () => {
    const { unmount } = renderHook(() =>
      useUnsavedChangesGuard(true)
    );
    unmount();

    expect(dispatchBeforeUnload()).toBe(false);
  });
});
