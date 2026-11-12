import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Text } from "@/app/components";
import { PATHS } from "@/app/constants";
import SystemScreen from "../SystemScreen";
import {
  SYSTEM_SCREEN_BASE_CLASS,
  SYSTEM_SCREEN_CONTENT_CLEARANCE_CLASS,
  resolveSystemScreenClassName,
} from "../styles/SystemScreen.styles";
import { createSystemScreenPage } from "./SystemScreen.page";
import {
  CHILD_TEXT,
  MIN_VIEWPORT_HEIGHT_CLASS,
  SECOND_CHILD_TEXT,
  SYSTEM_SCREEN_TEST_OVERVIEW,
} from "./SystemScreen.constants";

const systemScreenMocks = vi.hoisted(() => ({
  pathname: "",
}));

vi.mock("next/navigation", () => ({
  usePathname: () => systemScreenMocks.pathname,
}));

const renderSystemScreen = (
  pathname: string = PATHS.BOARD
) => {
  systemScreenMocks.pathname = pathname;

  return render(
    <SystemScreen overview={SYSTEM_SCREEN_TEST_OVERVIEW}>
      <Text>{CHILD_TEXT}</Text>
      <Text>{SECOND_CHILD_TEXT}</Text>
    </SystemScreen>
  );
};

describe("SystemScreen", () => {
  it("renders its children inside the frame", () => {
    renderSystemScreen();
    const page = createSystemScreenPage();

    expect(page.getFrame()).toContainElement(
      page.getChild()
    );
    expect(page.getFrame()).toContainElement(
      page.getSecondChild()
    );
  });

  it("carries the system screen class and nothing else", () => {
    renderSystemScreen();
    const page = createSystemScreenPage();

    expect(page.getFrame()).toHaveClass(
      resolveSystemScreenClassName(true),
      { exact: true }
    );
  });

  it("keeps the frame at least as tall as the viewport", () => {
    expect(SYSTEM_SCREEN_BASE_CLASS.split(" ")).toContain(
      MIN_VIEWPORT_HEIGHT_CLASS
    );
  });

  it("does not leave navigation clearance on mode selection", () => {
    renderSystemScreen(PATHS.MODE);
    const page = createSystemScreenPage();

    expect(page.getFrame()).toHaveClass(
      resolveSystemScreenClassName(false),
      { exact: true }
    );
    expect(page.getFrame()).not.toHaveClass(
      SYSTEM_SCREEN_CONTENT_CLEARANCE_CLASS
    );
  });
});
