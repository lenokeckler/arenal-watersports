import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Text } from "@/app/components";
import SystemScreen from "../SystemScreen";
import { SYSTEM_SCREEN_CLASS } from "../styles/SystemScreen.styles";
import { createSystemScreenPage } from "./SystemScreen.page";
import {
  CHILD_TEXT,
  MIN_VIEWPORT_HEIGHT_CLASS,
  SECOND_CHILD_TEXT,
} from "./SystemScreen.constants";

const renderSystemScreen = () =>
  render(
    <SystemScreen>
      <Text>{CHILD_TEXT}</Text>
      <Text>{SECOND_CHILD_TEXT}</Text>
    </SystemScreen>
  );

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
      SYSTEM_SCREEN_CLASS,
      { exact: true }
    );
  });

  it("keeps the frame at least as tall as the viewport", () => {
    expect(SYSTEM_SCREEN_CLASS.split(" ")).toContain(
      MIN_VIEWPORT_HEIGHT_CLASS
    );
  });
});
