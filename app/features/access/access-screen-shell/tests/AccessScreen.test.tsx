import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Text } from "@/app/components";
import AccessScreen from "../AccessScreen";
import { createAccessScreenPage } from "./AccessScreen.page";
import { createAccessScreenHeaderPage } from "./AccessScreenHeader.page";
import { CHILD_TEXT } from "./AccessScreenShell.constants";

const renderAccessScreen = () =>
  render(
    <AccessScreen>
      <Text>{CHILD_TEXT}</Text>
    </AccessScreen>
  );

describe("AccessScreen", () => {
  it("puts the card inside the main landmark", () => {
    renderAccessScreen();
    const page = createAccessScreenPage();

    expect(page.getMain()).toContainElement(page.getCard());
  });

  it("names the card after the header title", () => {
    renderAccessScreen();
    const page = createAccessScreenPage();
    const header = createAccessScreenHeaderPage();

    expect(page.getCard()).toContainElement(
      header.getTitle()
    );
  });

  it("renders the screen content inside the card", () => {
    renderAccessScreen();
    const page = createAccessScreenPage();

    expect(page.getCard()).toContainElement(
      page.getChild()
    );
  });
});
